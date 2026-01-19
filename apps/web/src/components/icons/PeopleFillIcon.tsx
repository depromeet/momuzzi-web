import { ComponentProps } from 'react';

const PeopleFillIcon = ({ ...props }: ComponentProps<'svg'>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.0625 15.625C9.0625 15.625 8.125 15.625 8.125 14.6875C8.125 13.75 9.0625 10.9375 12.8125 10.9375C16.5625 10.9375 17.5 13.75 17.5 14.6875C17.5 15.625 16.5625 15.625 16.5625 15.625H9.0625ZM12.8125 10C13.5584 10 14.2738 9.70368 14.8012 9.17624C15.3287 8.64879 15.625 7.93342 15.625 7.1875C15.625 6.44158 15.3287 5.72621 14.8012 5.19876C14.2738 4.67132 13.5584 4.375 12.8125 4.375C12.0666 4.375 11.3512 4.67132 10.8238 5.19876C10.2963 5.72621 10 6.44158 10 7.1875C10 7.93342 10.2963 8.64879 10.8238 9.17624C11.3512 9.70368 12.0666 10 12.8125 10Z"
        fill="url(#paint0_linear_4562_6063)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.39 15.6254C7.25102 15.3327 7.18171 15.0118 7.1875 14.6879C7.1875 13.4176 7.825 12.1098 9.0025 11.2004C8.41477 11.0193 7.80245 10.9308 7.1875 10.9379C3.4375 10.9379 2.5 13.7504 2.5 14.6879C2.5 15.6254 3.4375 15.6254 3.4375 15.6254H7.39Z"
        fill="url(#paint1_linear_4562_6063)"
      />
      <path
        d="M6.71875 10C7.34035 10 7.93649 9.75307 8.37603 9.31353C8.81557 8.87399 9.0625 8.27785 9.0625 7.65625C9.0625 7.03465 8.81557 6.43851 8.37603 5.99897C7.93649 5.55943 7.34035 5.3125 6.71875 5.3125C6.09715 5.3125 5.50101 5.55943 5.06147 5.99897C4.62193 6.43851 4.375 7.03465 4.375 7.65625C4.375 8.27785 4.62193 8.87399 5.06147 9.31353C5.50101 9.75307 6.09715 10 6.71875 10Z"
        fill="url(#paint2_linear_4562_6063)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4562_6063"
          x1="7.31343"
          y1="3.01411"
          x2="18.7285"
          y2="3.3231"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="0.5" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4562_6063"
          x1="1.9371"
          y1="10.3704"
          x2="9.84434"
          y2="10.7267"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="0.5" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4562_6063"
          x1="3.96922"
          y1="4.74546"
          x2="9.67492"
          y2="4.93079"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="0.5" stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default PeopleFillIcon;
