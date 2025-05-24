import ColorThief from "colorthief";

export function msToTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000); // 毫秒 → 秒（取整）
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

// 颜色结果类型
export type ColorResult = {
  primary: string; // 主色（CSS颜色格式）
  secondary: string; // 次要颜色（CSS颜色格式）
  primaryRGB: number[]; // RGB格式的主色
  secondaryRGB: number[]; // RGB格式的次要色
};

/**
 * 从图片元素中提取颜色
 * @param imgElement 图片元素
 * @param darkMode 是否降低亮度（适合作为背景）
 * @returns 包含主色和次要色的Promise
 */
export function colorExtract(imgElement: HTMLImageElement, darkMode = true): Promise<ColorResult> {
  return new Promise((resolve) => {
    try {
      if (!imgElement || !imgElement.complete || !imgElement.naturalWidth) {
        resolve({
          primary: "#68122e", // 默认主色
          secondary: "#2e1017", // 默认次要色
          primaryRGB: [104, 18, 46],
          secondaryRGB: [46, 16, 23]
        });
        return;
      }

      const colorThief = new ColorThief();
      
      // 获取主色
      const mainColor = colorThief.getColor(imgElement);
      
      // 获取调色板（取3种颜色）
      const palette = colorThief.getPalette(imgElement, 3);
      const secondColor = palette[1] || mainColor;
      
      // 根据darkMode决定是否降低亮度
      const primaryRGB = darkMode 
        ? [mainColor[0] * 0.7, mainColor[1] * 0.7, mainColor[2] * 0.7] 
        : mainColor;
      
      const secondaryRGB = darkMode 
        ? [secondColor[0] * 0.5, secondColor[1] * 0.5, secondColor[2] * 0.5] 
        : secondColor;
        
      resolve({
        primary: `rgb(${Math.round(primaryRGB[0])}, ${Math.round(primaryRGB[1])}, ${Math.round(primaryRGB[2])})`,
        secondary: `rgb(${Math.round(secondaryRGB[0])}, ${Math.round(secondaryRGB[1])}, ${Math.round(secondaryRGB[2])})`,
        primaryRGB: primaryRGB.map(Math.round) as number[],
        secondaryRGB: secondaryRGB.map(Math.round) as number[]
      });
    } catch (error) {
      console.error('提取颜色失败:', error);
      // 返回默认颜色
      resolve({
        primary: "#68122e", // 默认主色
        secondary: "#2e1017", // 默认次要色
        primaryRGB: [104, 18, 46],
        secondaryRGB: [46, 16, 23]
      });
    }
  });
}

/**
 * 从URL加载图片并提取颜色
 * @param imageUrl 图片URL
 * @param darkMode 是否降低亮度（适合作为背景）
 * @returns 包含主色和次要色的Promise
 */
export function getColorFromURL(imageUrl: string, darkMode = true): Promise<ColorResult> {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve({
        primary: "#68122e",
        secondary: "#2e1017",
        primaryRGB: [104, 18, 46],
        secondaryRGB: [46, 16, 23]
      });
      return;
    }

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      colorExtract(img, darkMode).then(resolve);
    };
    
    img.onerror = () => {
      resolve({
        primary: "#68122e",
        secondary: "#2e1017",
        primaryRGB: [104, 18, 46],
        secondaryRGB: [46, 16, 23]
      });
    };
    
    img.src = imageUrl;
  });
}
