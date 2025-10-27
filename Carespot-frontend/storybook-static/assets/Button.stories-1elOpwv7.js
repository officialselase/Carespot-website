import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./Button-D3xp6VxQ.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";const nr={title:"Atoms/Button",component:e,parameters:{layout:"centered",docs:{description:{component:"A versatile button component with multiple variants, sizes, and states. Supports loading states and accessibility features."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","outline","ghost","danger"],description:"Visual style variant of the button"},size:{control:{type:"select"},options:["small","medium","large"],description:"Size of the button"},disabled:{control:{type:"boolean"},description:"Whether the button is disabled"},loading:{control:{type:"boolean"},description:"Whether the button shows a loading spinner"},children:{control:{type:"text"},description:"Button content"},onClick:{action:"clicked"}}},a={args:{children:"Button"}},t={args:{children:"Primary Button",variant:"primary"}},s={args:{children:"Secondary Button",variant:"secondary"}},n={args:{children:"Outline Button",variant:"outline"}},o={args:{children:"Ghost Button",variant:"ghost"}},i={args:{children:"Danger Button",variant:"danger"}},c={args:{children:"Small Button",size:"small"}},d={args:{children:"Medium Button",size:"medium"}},l={args:{children:"Large Button",size:"large"}},u={args:{children:"Disabled Button",disabled:!0}},m={args:{children:"Loading Button",loading:!0}},p={render:()=>r.jsxs("div",{className:"flex flex-wrap gap-4",children:[r.jsx(e,{variant:"primary",children:"Primary"}),r.jsx(e,{variant:"secondary",children:"Secondary"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"}),r.jsx(e,{variant:"danger",children:"Danger"})]}),parameters:{docs:{description:{story:"All button variants displayed together for comparison."}}}},g={render:()=>r.jsxs("div",{className:"flex items-center gap-4",children:[r.jsx(e,{size:"small",children:"Small"}),r.jsx(e,{size:"medium",children:"Medium"}),r.jsx(e,{size:"large",children:"Large"})]}),parameters:{docs:{description:{story:"All button sizes displayed together for comparison."}}}};var h,B,y;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    children: 'Button'
  }
}`,...(y=(B=a.parameters)==null?void 0:B.docs)==null?void 0:y.source}}};var v,S,x;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
}`,...(x=(S=t.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var b,z,f;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
}`,...(f=(z=s.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};var j,D,A;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: 'Outline Button',
    variant: 'outline'
  }
}`,...(A=(D=n.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var L,O,G;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    children: 'Ghost Button',
    variant: 'ghost'
  }
}`,...(G=(O=o.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var M,P,w;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    children: 'Danger Button',
    variant: 'danger'
  }
}`,...(w=(P=i.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};var N,V,_;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    children: 'Small Button',
    size: 'small'
  }
}`,...(_=(V=c.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};var k,E,W;d.parameters={...d.parameters,docs:{...(k=d.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    children: 'Medium Button',
    size: 'medium'
  }
}`,...(W=(E=d.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var C,R,T;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    children: 'Large Button',
    size: 'large'
  }
}`,...(T=(R=l.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var q,F,H;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}`,...(H=(F=u.parameters)==null?void 0:F.docs)==null?void 0:H.source}}};var I,J,K;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    children: 'Loading Button',
    loading: true
  }
}`,...(K=(J=m.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,U,X;p.parameters={...p.parameters,docs:{...(Q=p.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => <div className="flex flex-wrap gap-4">\r
      <Button variant="primary">Primary</Button>\r
      <Button variant="secondary">Secondary</Button>\r
      <Button variant="outline">Outline</Button>\r
      <Button variant="ghost">Ghost</Button>\r
      <Button variant="danger">Danger</Button>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All button variants displayed together for comparison.'
      }
    }
  }
}`,...(X=(U=p.parameters)==null?void 0:U.docs)==null?void 0:X.source}}};var Y,Z,$;g.parameters={...g.parameters,docs:{...(Y=g.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <div className="flex items-center gap-4">\r
      <Button size="small">Small</Button>\r
      <Button size="medium">Medium</Button>\r
      <Button size="large">Large</Button>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All button sizes displayed together for comparison.'
      }
    }
  }
}`,...($=(Z=g.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const or=["Default","Primary","Secondary","Outline","Ghost","Danger","Small","Medium","Large","Disabled","Loading","AllVariants","AllSizes"];export{g as AllSizes,p as AllVariants,i as Danger,a as Default,u as Disabled,o as Ghost,l as Large,m as Loading,d as Medium,n as Outline,t as Primary,s as Secondary,c as Small,or as __namedExportsOrder,nr as default};
