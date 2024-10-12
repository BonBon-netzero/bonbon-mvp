import Dialog from "rc-dialog";
import { useEffect } from "react";

import useIsMobile from "@/hooks/helpers/useIsMobile";

// const RcDialogStyle = createGlobalStyle`
//   .rc-dialog-wrap {
//     display: flex;
//   }
// `;

export default function RcDialog({
  isOpen,
  onDismiss,
  destroyOnClose = false,
  forceRender = true,
  children,
  bg = "",
  maxWidth = "1000px",
  offsetTop = "100px",
  offsetBottom = "100px",
}: {
  isOpen: boolean;
  onDismiss: () => void;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  children: React.ReactNode;
  bg?: string;
  maxWidth?: string;
  offsetTop?: string;
  offsetBottom?: string;
}) {
  const maxHeight = `calc(100svh - ${offsetTop} - ${offsetBottom})`;
  const isMobile = useIsMobile();
  useEffect(() => {
    const handleBackButton = () => {
      if (!isOpen || !isMobile) return;
      onDismiss();
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [isOpen, isMobile]);
  return (
    <>
      {/* <RcDialogStyle /> */}
      <Dialog
        visible={isOpen}
        // wrapClassName={wrapClassName}
        animation="fade"
        maskAnimation="fade"
        onClose={onDismiss}
        // style={style}
        // title="dialog1"
        // mousePosition={mousePosition}
        destroyOnClose={destroyOnClose}
        // closeIcon={useIcon ? getSvg(clearPath, {}, true) : undefined}
        closeIcon={<></>}
        forceRender={forceRender}
        zIndex={9999}
        styles={{
          wrapper: {
            margin: 0,
            padding: 0,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
          },
          mask: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
          content: {
            padding: 0,
            margin: 0,
            borderRadius: 0,
          },
          body: {
            padding: 0,
            margin: 0,
            backgroundColor: bg,
          },
        }}
        style={{
          height: isMobile ? "100svh" : "auto",
          width: "100svw",
          margin: 0,
          padding: 0,
          marginTop: offsetTop,
          marginBottom: offsetBottom,
          maxWidth,
          maxHeight,
          overflow: "hidden auto",
        }}
        // focusTriggerAfterClose={false}
      >
        {children}
      </Dialog>
    </>
  );
}
