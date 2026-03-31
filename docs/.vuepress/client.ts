import { defineClientConfig } from "vuepress/client";
import { defineComponent, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import HeroParticles from "./components/HeroParticles.vue";
import FeatureCards from "./components/FeatureCards.vue";
import TechTree from "./components/TechTree.vue";
import AiMilestones from "./components/AiMilestones.vue";

const FULLPAGE_PATHS = ["/", "/milestones.html"];

function applyFullPageStyles(enable: boolean) {
  const container = document.querySelector(".theme-container") as HTMLElement;
  if (!container) return;

  if (enable) {
    container.classList.add("custom-fullpage");

    // 强制覆盖 vp-page 的 padding (theme 设 padding: 60px 256px 32px 0)
    const vpPage = container.querySelector(".vp-page") as HTMLElement;
    if (vpPage) {
      vpPage.style.cssText = "max-width:100%!important;width:100%!important;padding:0!important;margin:0!important;box-sizing:border-box!important;";
    }

    // 强制覆盖 [vp-content] 的 max-width: 980px
    const vpContent = container.querySelector("[vp-content]") as HTMLElement;
    if (vpContent) {
      vpContent.style.cssText = "max-width:100%!important;width:100%!important;padding:0!important;margin:0!important;";
    }

    // [vp-content] 下的第一个 div 也撑满
    const innerDiv = vpContent?.firstElementChild as HTMLElement;
    if (innerDiv) {
      innerDiv.style.cssText = "max-width:100%!important;width:100%!important;padding:0!important;margin:0!important;";
    }

    // 隐藏 page-title / page-meta / breadcrumb
    container.querySelectorAll(".vp-page-title,.vp-page-meta,.vp-breadcrumb").forEach((el: Element) => {
      (el as HTMLElement).style.display = "none";
    });

    // 隐藏默认 footer
    container.querySelectorAll(".vp-footer-wrapper,.vp-footer").forEach((el: Element) => {
      (el as HTMLElement).style.display = "none";
    });
  } else {
    container.classList.remove("custom-fullpage");

    // 恢复默认样式
    const vpPage = container.querySelector(".vp-page") as HTMLElement;
    if (vpPage) vpPage.style.cssText = "";

    const vpContent = container.querySelector("[vp-content]") as HTMLElement;
    if (vpContent) vpContent.style.cssText = "";

    const innerDiv = vpContent?.firstElementChild as HTMLElement;
    if (innerDiv) innerDiv.style.cssText = "";

    container.querySelectorAll(".vp-page-title,.vp-page-meta,.vp-breadcrumb").forEach((el: Element) => {
      (el as HTMLElement).style.display = "";
    });

    container.querySelectorAll(".vp-footer-wrapper,.vp-footer").forEach((el: Element) => {
      (el as HTMLElement).style.display = "";
    });
  }
}

const FullPageController = defineComponent({
  name: "FullPageController",
  setup() {
    const route = useRoute();

    const update = () => {
      nextTick(() => {
        const isFullPage = FULLPAGE_PATHS.includes(route.path);
        applyFullPageStyles(isFullPage);
      });
    };

    onMounted(() => {
      update();
      // 二次检查，确保 DOM 完全渲染后也生效
      setTimeout(update, 100);
      setTimeout(update, 500);
    });

    watch(() => route.path, () => {
      update();
      setTimeout(update, 100);
    });

    return () => null;
  },
});

export default defineClientConfig({
  enhance({ app }) {
    app.component("HeroParticles", HeroParticles);
    app.component("FeatureCards", FeatureCards);
    app.component("TechTree", TechTree);
    app.component("AiMilestones", AiMilestones);
  },
  rootComponents: [FullPageController],
});
