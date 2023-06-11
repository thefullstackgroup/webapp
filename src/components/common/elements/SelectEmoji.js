import EmojiPicker from 'emoji-picker-react';
import { useTheme } from 'next-themes';
import ModalAlert from '../modals/ModalAlert';

const SelectEmoji = ({ show, setShow, text, setText }) => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const onEmojiClick = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
    setShow(false);
  };

  return (
    <ModalAlert
      show={show}
      setShow={setShow}
      title={'Pick emoji'}
      dimensions={'sm:max-w-[430px]'}
      disabled
    >
      <div className="py-3">
        <EmojiPicker
          theme={currentTheme === 'dark' ? 'dark' : 'light'}
          lazyLoadEmojis={true}
          height={500}
          width={400}
          onEmojiClick={onEmojiClick}
        />
      </div>
    </ModalAlert>
  );
};

export default SelectEmoji;
