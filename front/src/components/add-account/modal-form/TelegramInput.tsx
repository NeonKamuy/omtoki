import React, { useCallback } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export const TelegramInput = React.forwardRef<HTMLInputElement>((props, ref) => {
    const validateLatin = useCallback((event: React.KeyboardEvent<HTMLInputElement>)=>{
        const key = event.key;
        if(!/[a-z0-9_]/i.test(key)) event.preventDefault();
    }, []);

    return (
    <>
      <div className="sector">
        <span>Телеграм</span>
      </div>
      <div className="sector">
        <InputGroup className="tg-input-group">
          <InputGroup.Prepend>
            <InputGroup.Text className="tg-input-prepend">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            ref={ref}
            className="tg-input"
            onKeyPress={validateLatin}
          />
        </InputGroup>
      </div>
    </>
  );
});
