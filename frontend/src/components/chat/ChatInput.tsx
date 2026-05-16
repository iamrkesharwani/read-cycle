import type React from "react";
import { inputCls } from "./chatStyles";
import { Send } from "lucide-react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatInput = ({ value, onChange, onSend }: Props) => {
  return (
    <div className={inputCls.root}>
      <div className={inputCls.wrap}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Type a message…"
          className={inputCls.field}
          maxLength={2000}
        />
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className={`${inputCls.sendBtn} ${value.trim() ? inputCls.sendActive : inputCls.sendDisabled}`}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
