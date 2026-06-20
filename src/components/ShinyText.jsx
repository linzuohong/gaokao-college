import "./ShinyText.css";

/**
 * ShinyText - 金属闪光文字组件
 * 基于 react-bits.dev ShinyText 效果
 * 用 CSS gradient + background-clip 实现金属光泽扫过文字
 */
const ShinyText = ({
  text,
  speed = 3,
  disabled = false,
  className = "",
  shineColor = "#ffffff",
  baseColor = "#94a3b8",
  spread = 120,
}) => {
  return (
    <span
      className={`shiny-text ${disabled ? "shiny-disabled" : ""} ${className}`}
      style={{
        "--shine-color": shineColor,
        "--base-color": baseColor,
        "--speed": `${speed}s`,
        "--spread": `${spread}deg`,
        animationDuration: `${speed}s`,
      }}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default ShinyText;
