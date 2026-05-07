export const ButtonTemplate = ({ text, link }: { text: string; link: string }) => `
<div style="
      background-color: #0150fe;
      padding:14px 28px;
      border-radius: 8px;
      color: white;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      cursor: pointer;
    "
  >
    <a 
      style="
      color: white;
      text-decoration: none;
      display: inline-block;
      text-align: center;
    "
      href="${link}"
      target="_blank"
      rel="noopener noreferrer">
     ${text}
    </a>
</div>
`;
