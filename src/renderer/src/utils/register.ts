import { createApp, h } from "vue";
import ZhjDialog from "@/components/zhj_ui/zhj_dialog.vue";
interface ShowDialogOptions {
  title: string;
  onOk?: () => void;
  onCancel?: () => void;
}
export const showDialog = ({ title, onOk, onCancel }: ShowDialogOptions) => {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.zIndex = "99999";
  document.body.appendChild(div);

  const app = createApp({
    render() {
      return h(ZhjDialog, {
        title,
        onOk: () => {
          onOk && onOk();
          app.unmount();
          div.remove();
        },
        onCancel: () => {
          onCancel && onCancel();
          app.unmount();
          div.remove();
        },
      });
    },
  });

  app.mount(div);
};
