import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as r}from"./SearchBox-CIr8m-jj.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";import"./Button-D3xp6VxQ.js";import"./Input-CnPNCs4_.js";import"./Icon-DtfCRbnF.js";const te={title:"Molecules/SearchBox",component:r,parameters:{layout:"centered",docs:{description:{component:"SearchBox component combining an input field with a search button for user search functionality."}}},argTypes:{placeholder:{control:{type:"text"},description:"Placeholder text for the search input"},onSearch:{action:"searched",description:"Callback function called when search is submitted"},size:{control:{type:"select"},options:["small","medium","large"],description:"Size of the search components"}},decorators:[x=>e.jsx("div",{style:{width:"400px"},children:e.jsx(x,{})})]},s={args:{placeholder:"Search..."}},a={args:{placeholder:"Search projects..."}},c={args:{placeholder:"Find volunteers..."}},o={args:{placeholder:"Search locations..."}},t={args:{placeholder:"Search...",size:"small"}},l={args:{placeholder:"Search...",size:"medium"}},i={args:{placeholder:"Search...",size:"large"}},d={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Small"}),e.jsx(r,{placeholder:"Small search...",size:"small"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Medium"}),e.jsx(r,{placeholder:"Medium search...",size:"medium"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Large"}),e.jsx(r,{placeholder:"Large search...",size:"large"})]})]}),parameters:{docs:{description:{story:"All available sizes displayed together for comparison."}}}},n={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Website Search"}),e.jsx(r,{placeholder:"Search our programs, projects, and resources..."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Volunteer Directory"}),e.jsx(r,{placeholder:"Find volunteers by name, skills, or location..."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Project Database"}),e.jsx(r,{placeholder:"Search healthcare projects and initiatives..."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-3",children:"Resource Library"}),e.jsx(r,{placeholder:"Find documents, reports, and resources..."})]})]}),parameters:{docs:{description:{story:"Examples of SearchBox usage in different NGO website contexts."}}}},m={render:()=>{const x=X=>{alert(`Searching for: "${X}"`)};return e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{placeholder:"Try searching for something...",onSearch:x}),e.jsx("p",{className:"text-sm text-gray-600",children:"Type something and press Enter or click the search button to see the search functionality."})]})},parameters:{docs:{description:{story:"Interactive example showing the search functionality in action."}}}},h={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{className:"bg-gray-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-700 mb-3",children:"Header Search"}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"text-lg font-semibold",children:"CareSpot"}),e.jsx(r,{placeholder:"Search...",size:"small",className:"max-w-xs"})]})]}),e.jsxs("div",{className:"bg-blue-600 text-white p-8 rounded-lg text-center",children:[e.jsx("h1",{className:"text-3xl font-bold mb-2",children:"Find Healthcare Resources"}),e.jsx("p",{className:"mb-6",children:"Search our comprehensive database of health programs and services"}),e.jsx(r,{placeholder:"Search programs, services, locations...",size:"large",className:"max-w-md mx-auto"})]}),e.jsxs("div",{className:"flex gap-6",children:[e.jsxs("div",{className:"w-64 bg-gray-50 p-4 rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-3",children:"Filter Resources"}),e.jsx(r,{placeholder:"Search filters...",size:"small"})]}),e.jsxs("div",{className:"flex-1 p-4 border rounded-lg",children:[e.jsx("h3",{className:"font-semibold mb-3",children:"Main Content Area"}),e.jsx("p",{className:"text-gray-600",children:"Content would be displayed here..."})]})]})]}),parameters:{docs:{description:{story:"Examples of SearchBox integrated into different page layouts and contexts."}}}},p={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"max-w-sm",children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Mobile View"}),e.jsx(r,{placeholder:"Search on mobile..."})]}),e.jsxs("div",{className:"max-w-md",children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Tablet View"}),e.jsx(r,{placeholder:"Search on tablet..."})]}),e.jsxs("div",{className:"max-w-lg",children:[e.jsx("h3",{className:"text-sm font-medium mb-2",children:"Desktop View"}),e.jsx(r,{placeholder:"Search on desktop..."})]})]}),parameters:{docs:{description:{story:"SearchBox component shown at different screen sizes to demonstrate responsive behavior."}}}};var u,b,g;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...'
  }
}`,...(g=(b=s.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var S,v,f;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search projects...'
  }
}`,...(f=(v=a.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var N,j,y;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    placeholder: 'Find volunteers...'
  }
}`,...(y=(j=c.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var w,z,B;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search locations...'
  }
}`,...(B=(z=o.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var k,M,F;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    size: 'small'
  }
}`,...(F=(M=t.parameters)==null?void 0:M.docs)==null?void 0:F.source}}};var L,E,V;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    size: 'medium'
  }
}`,...(V=(E=l.parameters)==null?void 0:E.docs)==null?void 0:V.source}}};var R,T,D;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search...',
    size: 'large'
  }
}`,...(D=(T=i.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var C,P,A;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <div>\r
        <label className="block text-sm font-medium mb-2">Small</label>\r
        <SearchBox placeholder="Small search..." size="small" />\r
      </div>\r
      <div>\r
        <label className="block text-sm font-medium mb-2">Medium</label>\r
        <SearchBox placeholder="Medium search..." size="medium" />\r
      </div>\r
      <div>\r
        <label className="block text-sm font-medium mb-2">Large</label>\r
        <SearchBox placeholder="Large search..." size="large" />\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All available sizes displayed together for comparison.'
      }
    }
  }
}`,...(A=(P=d.parameters)==null?void 0:P.docs)==null?void 0:A.source}}};var H,O,G;n.parameters={...n.parameters,docs:{...(H=n.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <div>\r
        <h3 className="text-lg font-semibold mb-3">Website Search</h3>\r
        <SearchBox placeholder="Search our programs, projects, and resources..." />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-3">Volunteer Directory</h3>\r
        <SearchBox placeholder="Find volunteers by name, skills, or location..." />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-3">Project Database</h3>\r
        <SearchBox placeholder="Search healthcare projects and initiatives..." />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-3">Resource Library</h3>\r
        <SearchBox placeholder="Find documents, reports, and resources..." />\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Examples of SearchBox usage in different NGO website contexts.'
      }
    }
  }
}`,...(G=(O=n.parameters)==null?void 0:O.docs)==null?void 0:G.source}}};var I,W,_;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const handleSearch = searchTerm => {
      alert(\`Searching for: "\${searchTerm}"\`);
    };
    return <div className="space-y-4">\r
        <SearchBox placeholder="Try searching for something..." onSearch={handleSearch} />\r
        <p className="text-sm text-gray-600">\r
          Type something and press Enter or click the search button to see the search functionality.\r
        </p>\r
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing the search functionality in action.'
      }
    }
  }
}`,...(_=(W=m.parameters)==null?void 0:W.docs)==null?void 0:_.source}}};var $,q,J;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      {/* Header search */}\r
      <div className="bg-gray-50 p-4 rounded-lg">\r
        <h3 className="text-sm font-medium text-gray-700 mb-3">Header Search</h3>\r
        <div className="flex justify-between items-center">\r
          <div className="text-lg font-semibold">CareSpot</div>\r
          <SearchBox placeholder="Search..." size="small" className="max-w-xs" />\r
        </div>\r
      </div>\r
\r
      {/* Hero section search */}\r
      <div className="bg-blue-600 text-white p-8 rounded-lg text-center">\r
        <h1 className="text-3xl font-bold mb-2">Find Healthcare Resources</h1>\r
        <p className="mb-6">Search our comprehensive database of health programs and services</p>\r
        <SearchBox placeholder="Search programs, services, locations..." size="large" className="max-w-md mx-auto" />\r
      </div>\r
\r
      {/* Sidebar search */}\r
      <div className="flex gap-6">\r
        <div className="w-64 bg-gray-50 p-4 rounded-lg">\r
          <h3 className="font-semibold mb-3">Filter Resources</h3>\r
          <SearchBox placeholder="Search filters..." size="small" />\r
        </div>\r
        <div className="flex-1 p-4 border rounded-lg">\r
          <h3 className="font-semibold mb-3">Main Content Area</h3>\r
          <p className="text-gray-600">Content would be displayed here...</p>\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Examples of SearchBox integrated into different page layouts and contexts.'
      }
    }
  }
}`,...(J=(q=h.parameters)==null?void 0:q.docs)==null?void 0:J.source}}};var K,Q,U;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <div className="max-w-sm">\r
        <h3 className="text-sm font-medium mb-2">Mobile View</h3>\r
        <SearchBox placeholder="Search on mobile..." />\r
      </div>\r
      <div className="max-w-md">\r
        <h3 className="text-sm font-medium mb-2">Tablet View</h3>\r
        <SearchBox placeholder="Search on tablet..." />\r
      </div>\r
      <div className="max-w-lg">\r
        <h3 className="text-sm font-medium mb-2">Desktop View</h3>\r
        <SearchBox placeholder="Search on desktop..." />\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'SearchBox component shown at different screen sizes to demonstrate responsive behavior.'
      }
    }
  }
}`,...(U=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const le=["Default","ProjectSearch","VolunteerSearch","LocationSearch","Small","Medium","Large","AllSizes","NGOSearchExamples","WithSearchFunctionality","InPageLayouts","MobileResponsive"];export{d as AllSizes,s as Default,h as InPageLayouts,i as Large,o as LocationSearch,l as Medium,p as MobileResponsive,n as NGOSearchExamples,a as ProjectSearch,t as Small,c as VolunteerSearch,m as WithSearchFunctionality,le as __namedExportsOrder,te as default};
