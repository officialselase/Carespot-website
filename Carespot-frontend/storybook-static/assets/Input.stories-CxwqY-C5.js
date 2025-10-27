import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as r}from"./Input-CnPNCs4_.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";const oe={title:"Atoms/Input",component:r,parameters:{layout:"centered",docs:{description:{component:"A flexible input component with label, error states, helper text, and accessibility features."}}},argTypes:{label:{control:{type:"text"},description:"Label text for the input"},placeholder:{control:{type:"text"},description:"Placeholder text"},error:{control:{type:"text"},description:"Error message to display"},helperText:{control:{type:"text"},description:"Helper text to display below input"},type:{control:{type:"select"},options:["text","email","password","number","tel","url"],description:"Input type"},size:{control:{type:"select"},options:["small","medium","large"],description:"Size of the input"},variant:{control:{type:"select"},options:["default","filled"],description:"Visual variant of the input"},disabled:{control:{type:"boolean"},description:"Whether the input is disabled"},required:{control:{type:"boolean"},description:"Whether the input is required"}},decorators:[ee=>e.jsx("div",{style:{width:"300px"},children:e.jsx(ee,{})})]},a={args:{placeholder:"Enter text..."}},t={args:{label:"Email Address",type:"email",placeholder:"Enter your email"}},l={args:{label:"Full Name",placeholder:"Enter your full name",required:!0}},s={args:{label:"Password",type:"password",placeholder:"Enter password",helperText:"Must be at least 8 characters long"}},o={args:{label:"Email Address",type:"email",placeholder:"Enter your email",error:"Please enter a valid email address",defaultValue:"invalid-email"}},n={args:{label:"Disabled Input",placeholder:"This input is disabled",disabled:!0,defaultValue:"Cannot edit this"}},p={args:{label:"Small Input",size:"small",placeholder:"Small size"}},i={args:{label:"Medium Input",size:"medium",placeholder:"Medium size"}},d={args:{label:"Large Input",size:"large",placeholder:"Large size"}},c={args:{label:"Default Variant",variant:"default",placeholder:"Default styling"}},u={args:{label:"Filled Variant",variant:"filled",placeholder:"Filled styling"}},m={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{label:"Text Input",type:"text",placeholder:"Enter text"}),e.jsx(r,{label:"Email Input",type:"email",placeholder:"Enter email"}),e.jsx(r,{label:"Password Input",type:"password",placeholder:"Enter password"}),e.jsx(r,{label:"Number Input",type:"number",placeholder:"Enter number"}),e.jsx(r,{label:"Phone Input",type:"tel",placeholder:"Enter phone number"}),e.jsx(r,{label:"URL Input",type:"url",placeholder:"Enter URL"})]}),parameters:{docs:{description:{story:"Different input types supported by the component."}}}},h={render:()=>e.jsxs("form",{className:"space-y-4",children:[e.jsx(r,{label:"First Name",placeholder:"Enter your first name",required:!0}),e.jsx(r,{label:"Email Address",type:"email",placeholder:"Enter your email",required:!0,helperText:"We'll never share your email with anyone else."}),e.jsx(r,{label:"Phone Number",type:"tel",placeholder:"Enter your phone number"}),e.jsx(r,{label:"Website",type:"url",placeholder:"https://example.com",helperText:"Optional: Your personal or company website"})]}),parameters:{docs:{description:{story:"Example of inputs used in a form context."}}}};var b,y,x;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    placeholder: 'Enter text...'
  }
}`,...(x=(y=a.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var g,E,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email'
  }
}`,...(f=(E=t.parameters)==null?void 0:E.docs)==null?void 0:f.source}}};var I,w,S;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true
  }
}`,...(S=(w=l.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var j,v,T;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters long'
  }
}`,...(T=(v=s.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var z,D,L;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email'
  }
}`,...(L=(D=o.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var V,F,N;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    defaultValue: 'Cannot edit this'
  }
}`,...(N=(F=n.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var W,P,q;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Small Input',
    size: 'small',
    placeholder: 'Small size'
  }
}`,...(q=(P=p.parameters)==null?void 0:P.docs)==null?void 0:q.source}}};var A,M,R;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    label: 'Medium Input',
    size: 'medium',
    placeholder: 'Medium size'
  }
}`,...(R=(M=i.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var U,H,O;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    label: 'Large Input',
    size: 'large',
    placeholder: 'Large size'
  }
}`,...(O=(H=d.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var _,C,Y;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    label: 'Default Variant',
    variant: 'default',
    placeholder: 'Default styling'
  }
}`,...(Y=(C=c.parameters)==null?void 0:C.docs)==null?void 0:Y.source}}};var k,B,G;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Filled Variant',
    variant: 'filled',
    placeholder: 'Filled styling'
  }
}`,...(G=(B=u.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var J,K,Q;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <Input label="Text Input" type="text" placeholder="Enter text" />\r
      <Input label="Email Input" type="email" placeholder="Enter email" />\r
      <Input label="Password Input" type="password" placeholder="Enter password" />\r
      <Input label="Number Input" type="number" placeholder="Enter number" />\r
      <Input label="Phone Input" type="tel" placeholder="Enter phone number" />\r
      <Input label="URL Input" type="url" placeholder="Enter URL" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different input types supported by the component.'
      }
    }
  }
}`,...(Q=(K=m.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var X,Z,$;h.parameters={...h.parameters,docs:{...(X=h.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <form className="space-y-4">\r
      <Input label="First Name" placeholder="Enter your first name" required />\r
      <Input label="Email Address" type="email" placeholder="Enter your email" required helperText="We'll never share your email with anyone else." />\r
      <Input label="Phone Number" type="tel" placeholder="Enter your phone number" />\r
      <Input label="Website" type="url" placeholder="https://example.com" helperText="Optional: Your personal or company website" />\r
    </form>,
  parameters: {
    docs: {
      description: {
        story: 'Example of inputs used in a form context.'
      }
    }
  }
}`,...($=(Z=h.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const ne=["Default","WithLabel","Required","WithHelperText","WithError","Disabled","Small","Medium","Large","DefaultVariant","FilledVariant","InputTypes","FormExample"];export{a as Default,c as DefaultVariant,n as Disabled,u as FilledVariant,h as FormExample,m as InputTypes,d as Large,i as Medium,l as Required,p as Small,o as WithError,s as WithHelperText,t as WithLabel,ne as __namedExportsOrder,oe as default};
