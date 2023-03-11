interface Props {
  className: string;
}

export const Equalizer = ({ className }: Props) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="rotate(180 50 50)">
      <rect
        x="11.666666666666668"
        y="12.5"
        width="10"
        height="40"
        className="fill-current"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.2s"
        ></animate>
      </rect>
      <rect
        x="28.333333333333336"
        y="12.5"
        width="10"
        height="40"
        className="fill-current"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.8s"
        ></animate>
      </rect>
      <rect x="45" y="12.5" width="10" height="40" className="fill-current">
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="0s"
        ></animate>
      </rect>
      <rect
        x="61.66666666666667"
        y="12.5"
        width="10"
        height="40"
        className="fill-current"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.6s"
        ></animate>
      </rect>
      <rect
        x="78.33333333333333"
        y="12.5"
        width="10"
        height="40"
        className="fill-current"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          dur="1s"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.4s"
        ></animate>
      </rect>
    </g>
  </svg>
);
