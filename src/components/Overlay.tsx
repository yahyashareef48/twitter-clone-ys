import { FocusScope } from "react-aria";

export default function Overlay({ show, children }: any) {
  return (
    <>
      {show && (
        <div className="flex justify-center fixed w-full h-full top-0 left-0 right-0 bottom-0 z-50 bg-blue-200 bg-opacity-20">
          <FocusScope contain autoFocus>
            {children}
          </FocusScope>
        </div>
      )}
    </>
  );
}
