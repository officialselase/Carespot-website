import{j as h}from"./jsx-runtime-D_zvdyIk.js";import{r as b}from"./iframe-8Oj9oEWN.js";const y=b.forwardRef(({as:o="h2",size:i="xl",weight:n="semibold",color:d="text-color-text-primary",responsive:e=!0,dyslexic:p=!1,align:x="left",className:m="",children:a,...f},u)=>{const l={xs:e?"text-responsive-xs":"text-xs",sm:e?"text-responsive-sm":"text-sm",base:e?"text-responsive-base":"text-base",lg:e?"text-responsive-lg":"text-lg",xl:e?"text-responsive-xl":"text-xl","2xl":e?"text-responsive-2xl":"text-2xl","3xl":e?"text-responsive-3xl":"text-3xl","4xl":e?"text-responsive-4xl":"text-4xl","5xl":e?"text-responsive-5xl":"text-5xl"},s={light:"font-light",normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold",extrabold:"font-extrabold",black:"font-black"},t={left:"text-left",center:"text-center",right:"text-right"},r=["typography-heading","text-optimized",l[i]||l.xl,s[n]||s.semibold,t[x]||t.left,d,p?"font-dyslexic":"",m].filter(Boolean).join(" ");return h.jsx(o,{ref:u,className:r,...f,children:a})});y.displayName="Heading";y.__docgenInfo={description:`Heading Component - Semantic heading with responsive typography\r
\r
@param {Object} props\r
@param {string} props.as - HTML tag (h1, h2, h3, h4, h5, h6)\r
@param {string} props.size - Typography size (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl)\r
@param {string} props.weight - Font weight (light, normal, medium, semibold, bold, extrabold, black)\r
@param {string} props.color - Text color class\r
@param {boolean} props.responsive - Enable responsive sizing\r
@param {boolean} props.dyslexic - Use dyslexic-friendly font\r
@param {string} props.align - Text alignment (left, center, right)\r
@param {string} props.className - Additional CSS classes\r
@param {React.ReactNode} props.children - Content`,methods:[],displayName:"Heading",props:{as:{defaultValue:{value:"'h2'",computed:!1},required:!1},size:{defaultValue:{value:"'xl'",computed:!1},required:!1},weight:{defaultValue:{value:"'semibold'",computed:!1},required:!1},color:{defaultValue:{value:"'text-color-text-primary'",computed:!1},required:!1},responsive:{defaultValue:{value:"true",computed:!1},required:!1},dyslexic:{defaultValue:{value:"false",computed:!1},required:!1},align:{defaultValue:{value:"'left'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const v=b.forwardRef(({as:o="p",size:i="base",weight:n="normal",color:d="text-color-text-primary",responsive:e=!1,dyslexic:p=!1,align:x="left",lineHeight:m="relaxed",lead:a=!1,className:f="",children:u,...l},s)=>{const t={xs:e?"text-responsive-xs":"text-xs",sm:e?"text-responsive-sm":"text-sm",base:e?"text-responsive-base":"text-base",lg:e?"text-responsive-lg":"text-lg",xl:e?"text-responsive-xl":"text-xl"},r={light:"font-light",normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold"},g={left:"text-left",center:"text-center",right:"text-right",justify:"text-justify"},c={tight:"leading-tight",snug:"leading-snug",normal:"leading-normal",relaxed:"leading-relaxed",loose:"leading-loose"},q=["typography-body","text-optimized",a?"text-lg font-light leading-relaxed":t[i]||t.base,a?"":r[n]||r.normal,g[x]||g.left,a?"":c[m]||c.relaxed,d,p?"font-dyslexic":"",f].filter(Boolean).join(" ");return h.jsx(o,{ref:s,className:q,...l,children:u})});v.displayName="Body";v.__docgenInfo={description:`Body Component - Body text with optimized readability\r
\r
@param {Object} props\r
@param {string} props.as - HTML tag (p, div, span)\r
@param {string} props.size - Typography size (xs, sm, base, lg, xl)\r
@param {string} props.weight - Font weight (light, normal, medium, semibold, bold)\r
@param {string} props.color - Text color class\r
@param {boolean} props.responsive - Enable responsive sizing\r
@param {boolean} props.dyslexic - Use dyslexic-friendly font\r
@param {string} props.align - Text alignment (left, center, right, justify)\r
@param {string} props.lineHeight - Line height (tight, snug, normal, relaxed, loose)\r
@param {boolean} props.lead - Make text larger for lead paragraphs\r
@param {string} props.className - Additional CSS classes\r
@param {React.ReactNode} props.children - Content`,methods:[],displayName:"Body",props:{as:{defaultValue:{value:"'p'",computed:!1},required:!1},size:{defaultValue:{value:"'base'",computed:!1},required:!1},weight:{defaultValue:{value:"'normal'",computed:!1},required:!1},color:{defaultValue:{value:"'text-color-text-primary'",computed:!1},required:!1},responsive:{defaultValue:{value:"false",computed:!1},required:!1},dyslexic:{defaultValue:{value:"false",computed:!1},required:!1},align:{defaultValue:{value:"'left'",computed:!1},required:!1},lineHeight:{defaultValue:{value:"'relaxed'",computed:!1},required:!1},lead:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};export{v as B,y as H};
