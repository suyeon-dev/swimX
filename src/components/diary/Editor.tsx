'use client';

// Tiptap 관련 모듈
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'; // 이미지 삽입 확장
import ResizeImage from 'tiptap-extension-resize-image';
import Link from '@tiptap/extension-link'; // 링크 삽입 확장
import { useCallback, useRef } from 'react';
import { Button } from '../ui/button';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdImage,
  MdStrikethroughS,
} from 'react-icons/md';
import { FaLink, FaLinkSlash } from 'react-icons/fa6';
import { uploadImage } from '@/lib/api/diary/uploadImage';
import Placeholder from '@tiptap/extension-placeholder';

// props 타입 정의
// 부모에서 전달받은 제목, 본문 값과 setter 함수들
interface Props {
  title: string;
  onTitleChange: (val: string) => void;
  content: string | undefined;
  onContentChange: (val: string) => void;
}

export default function Editor({ content, onContentChange }: Props) {
  // Tiptap 에디터 인스턴스 생성
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image, // 이미지 삽입
      ResizeImage.configure({
        HTMLAttributes: {
          style: 'max-width: 500px; min-width: 100px;',
        },
      }), //이미지 사이즈 조정
      Link.configure({ openOnClick: false }), //링크 클릭 시 새 창 안 열리게 설정
      Placeholder.configure({
        placeholder: '사진과 함께 기록해보세요!',
        emptyEditorClass: 'text-muted-foreground',
      }),
    ],
    content, // 초기 컨텐츠 html
    editorProps: {
      attributes: {
        class: `border border-gray-300 rounded prose max-w-none min-h-[200px] focus:outline-none [&_img]:max-w-full [&_img]:h-auto [&_img]:max-h-[400px]`, // Tailwind 스타일 적용
      },
    },
    onUpdate({ editor }) {
      // 콘텐츠 변경 시 onContentChange 호출 (상위로 html 상태 전달)
      onContentChange(editor.getHTML());
    },
  });

  // 파일 선택 input을 가리키는 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 버튼 클릭 시 input 클릭 유도
  const handleImageButtonClick = () => {
    fileInputRef.current?.click(); // 숨겨진 input 클릭 트리거
  };

  // 파일 선택 후 실행되는 함수
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 첫 번째 파일 가져오기
    if (!file) return;

    const url = await uploadImage(file); // REST 방식으로 Supabase 업로드
    if (!url) return alert('이미지 업로드 실패');

    // 업로드된 이미지 URL을 tiptap 에디터에 삽입
    editor?.chain().focus().setImage({ src: url }).run();
  };

  // 링크 삽입 버튼 클릭 시 실행되는 함수
  const insertLink = useCallback(() => {
    const url = prompt('링크 주소를 입력하세요');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run(); // 링크 삽입 명령 실행
    }
  }, [editor]);

  return (
    <div className='space-y-4'>
      {/* 툴바 영역 */}
      <div className='flex gap-2 flex-wrap items-center border rounded px-2 py-1'>
        {/* Heading 버튼들 */}
        {/* level을 number로 고정하고, as const 타입 추록 정확히 제한하기 */}
        {([1, 2, 3] as const).map((level) => (
          <Button
            type='button'
            key={level}
            variant={
              editor?.isActive('heading', { level }) ? 'default' : 'outline'
            }
            size='sm'
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </Button>
        ))}

        {/* Bold / Italic / Strike 버튼 */}
        <Button
          type='button'
          variant={editor?.isActive('bold') ? 'default' : 'outline'}
          size='sm'
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <MdFormatBold />
        </Button>
        <Button
          type='button'
          variant={editor?.isActive('italic') ? 'default' : 'outline'}
          size='sm'
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <MdFormatItalic />
        </Button>
        <Button
          type='button'
          variant={editor?.isActive('strike') ? 'default' : 'outline'}
          size='sm'
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          <MdStrikethroughS />
        </Button>

        {/* Bullet List / Ordered List 버튼 */}
        <Button
          type='button'
          variant={editor?.isActive('bulletList') ? 'default' : 'outline'}
          size='sm'
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted />
        </Button>
        <Button
          type='button'
          variant={editor?.isActive('orderedList') ? 'default' : 'outline'}
          size='sm'
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered />
        </Button>

        {/* 이미지 업로드 버튼 */}
        <Button type='button' size='sm' onClick={handleImageButtonClick}>
          <MdImage />
        </Button>

        {/* 숨겨진 파일 업로드 input */}
        <input
          type='file'
          accept='image/*'
          className='hidden' // 화면에서 숨김
          ref={fileInputRef} // 버튼 클릭 시 참조
          onChange={handleFileChange} // 파일 선택 시 콜백
        />

        {/* 링크 삽입 / 해제 버튼 */}
        <Button type='button' size='sm' onClick={insertLink}>
          <FaLink />
        </Button>
        <Button
          type='button'
          size='sm'
          onClick={() => editor?.chain().focus().unsetLink().run()}
        >
          <FaLinkSlash />
        </Button>
      </div>

      {/* 에디터 본문 영역 */}
      <EditorContent
        editor={editor} // 에디터 인스턴스 전달
        className='prose max-w-none w-full h-60 overflow-auto focus:outline'
      />
    </div>
  );
}
