import React from "react";

export const SkillInput = React.forwardRef<HTMLTextAreaElement>((props, ref) => {
    return (
        <>
            <div className="sector">
                <span>Навыки</span>
            </div>
            <div className="sector">
                <textarea
                    ref={ref}
                    placeholder="Например - Java, SQL, Ruby"
                ></textarea>
            </div>
        </>
    );
});
