import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{H as a,B as s}from"./Body-DwkL8sHn.js";import{r as X}from"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";const r=X.forwardRef(({as:n="span",size:f="sm",weight:b="medium",color:v="text-color-text-secondary",uppercase:H=!1,dyslexic:d=!1,align:j="left",spacing:z="normal",className:w="",children:N,...T},B)=>{const c={xs:"text-xs",sm:"text-sm",base:"text-base"},i={normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold"},t={left:"text-left",center:"text-center",right:"text-right"},o={normal:"tracking-normal",wide:"tracking-wide",wider:"tracking-wider",widest:"tracking-widest"},C=["typography-caption","text-optimized",c[f]||c.sm,i[b]||i.medium,t[j]||t.left,o[z]||o.normal,H?"uppercase":"",v,d?"font-dyslexic":"",w].filter(Boolean).join(" ");return e.jsx(n,{ref:B,className:C,...T,children:N})});r.displayName="Caption";r.__docgenInfo={description:`Caption Component - Small text for captions, labels, and metadata\r
\r
@param {Object} props\r
@param {string} props.as - HTML tag (span, p, div, figcaption)\r
@param {string} props.size - Typography size (xs, sm, base)\r
@param {string} props.weight - Font weight (normal, medium, semibold, bold)\r
@param {string} props.color - Text color class\r
@param {boolean} props.uppercase - Transform text to uppercase\r
@param {boolean} props.dyslexic - Use dyslexic-friendly font\r
@param {string} props.align - Text alignment (left, center, right)\r
@param {string} props.spacing - Letter spacing (normal, wide, wider, widest)\r
@param {string} props.className - Additional CSS classes\r
@param {React.ReactNode} props.children - Content`,methods:[],displayName:"Caption",props:{as:{defaultValue:{value:"'span'",computed:!1},required:!1},size:{defaultValue:{value:"'sm'",computed:!1},required:!1},weight:{defaultValue:{value:"'medium'",computed:!1},required:!1},color:{defaultValue:{value:"'text-color-text-secondary'",computed:!1},required:!1},uppercase:{defaultValue:{value:"false",computed:!1},required:!1},dyslexic:{defaultValue:{value:"false",computed:!1},required:!1},align:{defaultValue:{value:"'left'",computed:!1},required:!1},spacing:{defaultValue:{value:"'normal'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const l=X.forwardRef(({as:n="label",size:f="sm",weight:b="medium",color:v="text-color-text-primary",required:H=!1,disabled:d=!1,dyslexic:j=!1,align:z="left",htmlFor:w,className:N="",children:T,...B},c)=>{const i={xs:"text-xs",sm:"text-sm",base:"text-base",lg:"text-lg"},t={normal:"font-normal",medium:"font-medium",semibold:"font-semibold",bold:"font-bold"},o={left:"text-left",center:"text-center",right:"text-right"},C=()=>d?"text-color-text-disabled":v,Y=["typography-label","text-optimized",i[f]||i.sm,t[b]||t.medium,o[z]||o.left,C(),d?"cursor-not-allowed opacity-50":"cursor-pointer",j?"font-dyslexic":"",N].filter(Boolean).join(" ");return e.jsxs(n,{ref:c,className:Y,htmlFor:n==="label"?w:void 0,...B,children:[T,H&&e.jsx("span",{className:"text-color-error-600 ml-1","aria-label":"required",title:"This field is required",children:"*"})]})});l.displayName="Label";l.__docgenInfo={description:`Label Component - Form labels and UI labels with accessibility features\r
\r
@param {Object} props\r
@param {string} props.as - HTML tag (label, span, div)\r
@param {string} props.size - Typography size (xs, sm, base, lg)\r
@param {string} props.weight - Font weight (normal, medium, semibold, bold)\r
@param {string} props.color - Text color class\r
@param {boolean} props.required - Show required indicator\r
@param {boolean} props.disabled - Disabled state styling\r
@param {boolean} props.dyslexic - Use dyslexic-friendly font\r
@param {string} props.align - Text alignment (left, center, right)\r
@param {string} props.htmlFor - Associated form control ID\r
@param {string} props.className - Additional CSS classes\r
@param {React.ReactNode} props.children - Content`,methods:[],displayName:"Label",props:{as:{defaultValue:{value:"'label'",computed:!1},required:!1},size:{defaultValue:{value:"'sm'",computed:!1},required:!1},weight:{defaultValue:{value:"'medium'",computed:!1},required:!1},color:{defaultValue:{value:"'text-color-text-primary'",computed:!1},required:!1},required:{defaultValue:{value:"false",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},dyslexic:{defaultValue:{value:"false",computed:!1},required:!1},align:{defaultValue:{value:"'left'",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const se={title:"Typography/Overview",parameters:{layout:"padded",docs:{description:{component:"Typography system with semantic components for headings, body text, captions, and labels. Includes responsive sizing and accessibility features."}}}},m={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Headings"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(a,{as:"h1",size:"5xl",children:"Heading 1 - 5xl"}),e.jsx(a,{as:"h2",size:"4xl",children:"Heading 2 - 4xl"}),e.jsx(a,{as:"h3",size:"3xl",children:"Heading 3 - 3xl"}),e.jsx(a,{as:"h4",size:"2xl",children:"Heading 4 - 2xl"}),e.jsx(a,{as:"h5",size:"xl",children:"Heading 5 - xl"}),e.jsx(a,{as:"h6",size:"lg",children:"Heading 6 - lg"})]})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Body Text"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(s,{size:"lg",children:"Large body text - Perfect for introductory paragraphs and important content that needs emphasis."}),e.jsx(s,{size:"base",children:"Base body text - The standard size for most content, optimized for readability and comfortable reading experience."}),e.jsx(s,{size:"sm",children:"Small body text - Used for secondary information, fine print, or when space is limited but readability is still important."})]})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Labels & Captions"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(l,{size:"base",children:"Form Label - Base Size"}),e.jsx(l,{size:"sm",children:"Form Label - Small Size"}),e.jsx(r,{size:"base",children:"Caption text - Base size for image captions and descriptions"}),e.jsx(r,{size:"sm",children:"Caption text - Small size for minimal descriptions"})]})]})]}),parameters:{docs:{description:{story:"Complete typography scale showing all heading levels, body text sizes, and supporting text elements."}}}},p={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{weight:"light",children:"Light Weight Heading"}),e.jsx(a,{weight:"normal",children:"Normal Weight Heading"}),e.jsx(a,{weight:"medium",children:"Medium Weight Heading"}),e.jsx(a,{weight:"semibold",children:"Semibold Weight Heading"}),e.jsx(a,{weight:"bold",children:"Bold Weight Heading"}),e.jsx(a,{weight:"extrabold",children:"Extrabold Weight Heading"}),e.jsx(a,{weight:"black",children:"Black Weight Heading"})]}),parameters:{docs:{description:{story:"All available font weights for typography components."}}}},g={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(a,{color:"text-color-text-primary",children:"Primary Text Color"}),e.jsx(a,{color:"text-color-text-secondary",children:"Secondary Text Color"}),e.jsx(a,{color:"text-color-text-muted",children:"Muted Text Color"}),e.jsx(s,{color:"text-color-text-primary",children:"Primary body text with good contrast for main content."}),e.jsx(s,{color:"text-color-text-secondary",children:"Secondary body text for supporting information."}),e.jsx(s,{color:"text-color-text-muted",children:"Muted body text for less important details."})]}),parameters:{docs:{description:{story:"Typography components with different color variations from the design system."}}}},h={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx(a,{align:"left",className:"mb-2",children:"Left Aligned Heading"}),e.jsx(s,{align:"left",children:"This paragraph is aligned to the left, which is the default alignment for most text content in left-to-right languages."})]}),e.jsxs("div",{children:[e.jsx(a,{align:"center",className:"mb-2",children:"Center Aligned Heading"}),e.jsx(s,{align:"center",children:"This paragraph is center aligned, often used for hero sections, quotes, or special announcements that need emphasis."})]}),e.jsxs("div",{children:[e.jsx(a,{align:"right",className:"mb-2",children:"Right Aligned Heading"}),e.jsx(s,{align:"right",children:"This paragraph is aligned to the right, sometimes used for special layouts or in right-to-left language contexts."})]})]}),parameters:{docs:{description:{story:"Text alignment options available for all typography components."}}}},x={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Responsive Typography"}),e.jsx(a,{size:"4xl",responsive:!0,className:"mb-4",children:"This heading scales responsively across devices"}),e.jsx(s,{size:"lg",responsive:!0,children:"This body text also scales responsively, ensuring optimal readability on all screen sizes from mobile to desktop."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Fixed Typography"}),e.jsx(a,{size:"4xl",responsive:!1,className:"mb-4",children:"This heading has fixed sizing"}),e.jsx(s,{size:"lg",responsive:!1,children:"This body text maintains consistent sizing regardless of screen size."})]})]}),parameters:{docs:{description:{story:"Comparison between responsive and fixed typography sizing."}}}},y={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Standard Typography"}),e.jsx(a,{className:"mb-2",children:"Standard Heading Typography"}),e.jsx(s,{children:"Standard body text optimized for general readability with good contrast and spacing."})]}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Dyslexic-Friendly Typography"}),e.jsx(a,{dyslexic:!0,className:"mb-2",children:"Dyslexic-Friendly Heading"}),e.jsx(s,{dyslexic:!0,children:"Dyslexic-friendly body text using fonts and spacing optimized for users with dyslexia and other reading difficulties."})]})]}),parameters:{docs:{description:{story:"Accessibility features including dyslexic-friendly typography options."}}}},u={render:()=>e.jsxs("article",{className:"max-w-3xl space-y-6",children:[e.jsxs("header",{children:[e.jsx(a,{as:"h1",size:"4xl",className:"mb-2",children:"Transforming Healthcare in Rural Ghana"}),e.jsx(r,{color:"text-color-text-muted",children:"Published on March 15, 2024 • 5 min read"})]}),e.jsx(s,{size:"lg",color:"text-color-text-secondary",children:"Our latest healthcare initiative has reached over 10,000 people in remote villages, providing essential medical services and health education to communities that previously had limited access to healthcare."}),e.jsxs("div",{children:[e.jsx(a,{as:"h2",size:"2xl",className:"mb-3",children:"The Challenge"}),e.jsx(s,{className:"mb-4",children:"Rural communities in Ghana face significant barriers to accessing quality healthcare. Distance to medical facilities, lack of transportation, and limited resources create a complex web of challenges that our organization is working to address."}),e.jsx(s,{children:"Through our mobile health clinics and community health worker programs, we're bringing essential services directly to the people who need them most."})]}),e.jsxs("div",{children:[e.jsx(a,{as:"h3",size:"xl",className:"mb-3",children:"Our Approach"}),e.jsx(s,{className:"mb-4",children:"We believe in sustainable, community-driven solutions that empower local residents to take charge of their health and well-being."}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx(l,{className:"block mb-2",children:"Key Statistics"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 text-center",children:[e.jsxs("div",{children:[e.jsx(a,{as:"div",size:"2xl",color:"text-color-primary",children:"10,000+"}),e.jsx(r,{children:"People Served"})]}),e.jsxs("div",{children:[e.jsx(a,{as:"div",size:"2xl",color:"text-color-primary",children:"25"}),e.jsx(r,{children:"Villages Reached"})]})]})]})]})]}),parameters:{docs:{description:{story:"Real-world example showing how typography components work together in an article layout."}}}};var S,q,L;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Headings</h2>\r
        <div className="space-y-3">\r
          <Heading as="h1" size="5xl">Heading 1 - 5xl</Heading>\r
          <Heading as="h2" size="4xl">Heading 2 - 4xl</Heading>\r
          <Heading as="h3" size="3xl">Heading 3 - 3xl</Heading>\r
          <Heading as="h4" size="2xl">Heading 4 - 2xl</Heading>\r
          <Heading as="h5" size="xl">Heading 5 - xl</Heading>\r
          <Heading as="h6" size="lg">Heading 6 - lg</Heading>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Body Text</h2>\r
        <div className="space-y-3">\r
          <Body size="lg">Large body text - Perfect for introductory paragraphs and important content that needs emphasis.</Body>\r
          <Body size="base">Base body text - The standard size for most content, optimized for readability and comfortable reading experience.</Body>\r
          <Body size="sm">Small body text - Used for secondary information, fine print, or when space is limited but readability is still important.</Body>\r
        </div>\r
      </div>\r
\r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Labels & Captions</h2>\r
        <div className="space-y-3">\r
          <Label size="base">Form Label - Base Size</Label>\r
          <Label size="sm">Form Label - Small Size</Label>\r
          <Caption size="base">Caption text - Base size for image captions and descriptions</Caption>\r
          <Caption size="sm">Caption text - Small size for minimal descriptions</Caption>\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Complete typography scale showing all heading levels, body text sizes, and supporting text elements.'
      }
    }
  }
}`,...(L=(q=m.parameters)==null?void 0:q.docs)==null?void 0:L.source}}};var R,k,V;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <Heading weight="light">Light Weight Heading</Heading>\r
      <Heading weight="normal">Normal Weight Heading</Heading>\r
      <Heading weight="medium">Medium Weight Heading</Heading>\r
      <Heading weight="semibold">Semibold Weight Heading</Heading>\r
      <Heading weight="bold">Bold Weight Heading</Heading>\r
      <Heading weight="extrabold">Extrabold Weight Heading</Heading>\r
      <Heading weight="black">Black Weight Heading</Heading>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All available font weights for typography components.'
      }
    }
  }
}`,...(V=(k=p.parameters)==null?void 0:k.docs)==null?void 0:V.source}}};var W,A,F;g.parameters={...g.parameters,docs:{...(W=g.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <Heading color="text-color-text-primary">Primary Text Color</Heading>\r
      <Heading color="text-color-text-secondary">Secondary Text Color</Heading>\r
      <Heading color="text-color-text-muted">Muted Text Color</Heading>\r
      <Body color="text-color-text-primary">Primary body text with good contrast for main content.</Body>\r
      <Body color="text-color-text-secondary">Secondary body text for supporting information.</Body>\r
      <Body color="text-color-text-muted">Muted body text for less important details.</Body>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Typography components with different color variations from the design system.'
      }
    }
  }
}`,...(F=(A=g.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var D,M,P;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <div>\r
        <Heading align="left" className="mb-2">Left Aligned Heading</Heading>\r
        <Body align="left">This paragraph is aligned to the left, which is the default alignment for most text content in left-to-right languages.</Body>\r
      </div>\r
      \r
      <div>\r
        <Heading align="center" className="mb-2">Center Aligned Heading</Heading>\r
        <Body align="center">This paragraph is center aligned, often used for hero sections, quotes, or special announcements that need emphasis.</Body>\r
      </div>\r
      \r
      <div>\r
        <Heading align="right" className="mb-2">Right Aligned Heading</Heading>\r
        <Body align="right">This paragraph is aligned to the right, sometimes used for special layouts or in right-to-left language contexts.</Body>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Text alignment options available for all typography components.'
      }
    }
  }
}`,...(P=(M=h.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var O,E,_;x.parameters={...x.parameters,docs:{...(O=x.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Responsive Typography</h2>\r
        <Heading size="4xl" responsive={true} className="mb-4">\r
          This heading scales responsively across devices\r
        </Heading>\r
        <Body size="lg" responsive={true}>\r
          This body text also scales responsively, ensuring optimal readability on all screen sizes from mobile to desktop.\r
        </Body>\r
      </div>\r
      \r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Fixed Typography</h2>\r
        <Heading size="4xl" responsive={false} className="mb-4">\r
          This heading has fixed sizing\r
        </Heading>\r
        <Body size="lg" responsive={false}>\r
          This body text maintains consistent sizing regardless of screen size.\r
        </Body>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Comparison between responsive and fixed typography sizing.'
      }
    }
  }
}`,...(_=(E=x.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var I,U,G;y.parameters={...y.parameters,docs:{...(I=y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Standard Typography</h2>\r
        <Heading className="mb-2">Standard Heading Typography</Heading>\r
        <Body>Standard body text optimized for general readability with good contrast and spacing.</Body>\r
      </div>\r
      \r
      <div>\r
        <h2 className="text-lg font-semibold mb-4">Dyslexic-Friendly Typography</h2>\r
        <Heading dyslexic={true} className="mb-2">Dyslexic-Friendly Heading</Heading>\r
        <Body dyslexic={true}>Dyslexic-friendly body text using fonts and spacing optimized for users with dyslexia and other reading difficulties.</Body>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including dyslexic-friendly typography options.'
      }
    }
  }
}`,...(G=(U=y.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var K,J,Q;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <article className="max-w-3xl space-y-6">\r
      <header>\r
        <Heading as="h1" size="4xl" className="mb-2">\r
          Transforming Healthcare in Rural Ghana\r
        </Heading>\r
        <Caption color="text-color-text-muted">\r
          Published on March 15, 2024 • 5 min read\r
        </Caption>\r
      </header>\r
      \r
      <Body size="lg" color="text-color-text-secondary">\r
        Our latest healthcare initiative has reached over 10,000 people in remote villages, \r
        providing essential medical services and health education to communities that previously \r
        had limited access to healthcare.\r
      </Body>\r
      \r
      <div>\r
        <Heading as="h2" size="2xl" className="mb-3">\r
          The Challenge\r
        </Heading>\r
        <Body className="mb-4">\r
          Rural communities in Ghana face significant barriers to accessing quality healthcare. \r
          Distance to medical facilities, lack of transportation, and limited resources create \r
          a complex web of challenges that our organization is working to address.\r
        </Body>\r
        <Body>\r
          Through our mobile health clinics and community health worker programs, we're bringing \r
          essential services directly to the people who need them most.\r
        </Body>\r
      </div>\r
      \r
      <div>\r
        <Heading as="h3" size="xl" className="mb-3">\r
          Our Approach\r
        </Heading>\r
        <Body className="mb-4">\r
          We believe in sustainable, community-driven solutions that empower local residents \r
          to take charge of their health and well-being.\r
        </Body>\r
        \r
        <div className="bg-gray-50 p-4 rounded-lg">\r
          <Label className="block mb-2">Key Statistics</Label>\r
          <div className="grid grid-cols-2 gap-4 text-center">\r
            <div>\r
              <Heading as="div" size="2xl" color="text-color-primary">10,000+</Heading>\r
              <Caption>People Served</Caption>\r
            </div>\r
            <div>\r
              <Heading as="div" size="2xl" color="text-color-primary">25</Heading>\r
              <Caption>Villages Reached</Caption>\r
            </div>\r
          </div>\r
        </div>\r
      </div>\r
    </article>,
  parameters: {
    docs: {
      description: {
        story: 'Real-world example showing how typography components work together in an article layout.'
      }
    }
  }
}`,...(Q=(J=u.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const re=["TypographyScale","FontWeights","ColorVariations","TextAlignment","ResponsiveBehavior","AccessibilityFeatures","RealWorldExample"];export{y as AccessibilityFeatures,g as ColorVariations,p as FontWeights,u as RealWorldExample,x as ResponsiveBehavior,h as TextAlignment,m as TypographyScale,re as __namedExportsOrder,se as default};
