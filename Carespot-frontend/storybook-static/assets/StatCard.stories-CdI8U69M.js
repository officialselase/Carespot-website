import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as t}from"./StatCard-ChSFsgah.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";import"./Icon-DtfCRbnF.js";import"./Badge-DFuacdIg.js";const ie={title:"Molecules/StatCard",component:t,parameters:{layout:"centered",docs:{description:{component:"StatCard component for displaying key metrics and statistics with optional icons, trends, and variants."}}},argTypes:{title:{control:{type:"text"},description:"Title/label for the statistic"},value:{control:{type:"text"},description:"The main statistic value"},subtitle:{control:{type:"text"},description:"Optional subtitle or description"},icon:{control:{type:"select"},options:["heart","users","medical","globe","star"],description:"Optional icon to display"},trend:{control:{type:"select"},options:["up","down","neutral"],description:"Trend direction"},trendValue:{control:{type:"text"},description:'Trend value (e.g., "+12%")'},variant:{control:{type:"select"},options:["default","primary","success","warning","danger"],description:"Visual variant of the card"}},decorators:[U=>e.jsx("div",{style:{width:"300px"},children:e.jsx(U,{})})]},r={args:{title:"Total Donations",value:"$45,230",subtitle:"This month"}},a={args:{title:"People Helped",value:"12,450",subtitle:"Across all programs",icon:"users"}},i={args:{title:"Monthly Donations",value:"$8,420",subtitle:"March 2024",icon:"heart",trend:"up",trendValue:"+15%"}},s={args:{title:"Volunteer Applications",value:"234",subtitle:"This quarter",icon:"users",trend:"down",trendValue:"-8%"}},n={args:{title:"Active Projects",value:"18",subtitle:"Currently running",icon:"globe",trend:"neutral",trendValue:"0%"}},l={args:{title:"Healthcare Programs",value:"25",subtitle:"Active initiatives",icon:"medical",variant:"primary"}},o={args:{title:"Goals Achieved",value:"92%",subtitle:"This year",icon:"star",variant:"success",trend:"up",trendValue:"+5%"}},c={args:{title:"Pending Reviews",value:"47",subtitle:"Require attention",icon:"star",variant:"warning"}},d={args:{title:"Critical Issues",value:"3",subtitle:"Need immediate action",icon:"medical",variant:"danger"}},u={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",style:{width:"800px"},children:[e.jsx(t,{title:"Total Donations",value:"$45,230",subtitle:"This month",icon:"heart",variant:"default"}),e.jsx(t,{title:"Healthcare Programs",value:"25",subtitle:"Active initiatives",icon:"medical",variant:"primary"}),e.jsx(t,{title:"Goals Achieved",value:"92%",subtitle:"This year",icon:"star",variant:"success",trend:"up",trendValue:"+5%"}),e.jsx(t,{title:"Pending Reviews",value:"47",subtitle:"Require attention",icon:"users",variant:"warning"}),e.jsx(t,{title:"Critical Issues",value:"3",subtitle:"Need immediate action",icon:"medical",variant:"danger"})]}),parameters:{docs:{description:{story:"All StatCard variants displayed together."}}}},p={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",style:{width:"1000px"},children:[e.jsx(t,{title:"Total Donations",value:"$127,450",subtitle:"All time",icon:"heart",trend:"up",trendValue:"+23%",variant:"primary"}),e.jsx(t,{title:"People Served",value:"15,230",subtitle:"This year",icon:"users",trend:"up",trendValue:"+18%",variant:"success"}),e.jsx(t,{title:"Active Volunteers",value:"342",subtitle:"Currently active",icon:"users",trend:"up",trendValue:"+12%"}),e.jsx(t,{title:"Healthcare Programs",value:"28",subtitle:"Running programs",icon:"medical",trend:"neutral",trendValue:"0%"}),e.jsx(t,{title:"Villages Reached",value:"156",subtitle:"Across Ghana",icon:"globe",trend:"up",trendValue:"+8%"}),e.jsx(t,{title:"Medical Screenings",value:"8,420",subtitle:"This quarter",icon:"medical",trend:"up",trendValue:"+25%",variant:"success"}),e.jsx(t,{title:"Nutrition Programs",value:"12",subtitle:"Active programs",icon:"heart",trend:"up",trendValue:"+3%"}),e.jsx(t,{title:"Community Events",value:"45",subtitle:"This month",icon:"star",trend:"down",trendValue:"-5%",variant:"warning"})]}),parameters:{docs:{description:{story:"Example of StatCards used in an NGO dashboard context with real-world metrics."}}}},m={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",style:{width:"600px"},children:[e.jsx(t,{title:"Total Impact",value:"1.2M",subtitle:"Lives touched",icon:"heart",variant:"primary"}),e.jsx(t,{title:"Funds Raised",value:"$2.8M",subtitle:"Since inception",icon:"star",variant:"success"}),e.jsx(t,{title:"Global Reach",value:"50K+",subtitle:"Communities served",icon:"globe",variant:"default"})]}),parameters:{docs:{description:{story:"Examples of StatCards displaying large numbers with appropriate formatting."}}}};var v,g,h;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    title: 'Total Donations',
    value: '$45,230',
    subtitle: 'This month'
  }
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var b,y,S;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: 'People Helped',
    value: '12,450',
    subtitle: 'Across all programs',
    icon: 'users'
  }
}`,...(S=(y=a.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var x,C,V;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    title: 'Monthly Donations',
    value: '$8,420',
    subtitle: 'March 2024',
    icon: 'heart',
    trend: 'up',
    trendValue: '+15%'
  }
}`,...(V=(C=i.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var T,w,A;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    title: 'Volunteer Applications',
    value: '234',
    subtitle: 'This quarter',
    icon: 'users',
    trend: 'down',
    trendValue: '-8%'
  }
}`,...(A=(w=s.parameters)==null?void 0:w.docs)==null?void 0:A.source}}};var j,N,P;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    title: 'Active Projects',
    value: '18',
    subtitle: 'Currently running',
    icon: 'globe',
    trend: 'neutral',
    trendValue: '0%'
  }
}`,...(P=(N=n.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var f,R,D;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    title: 'Healthcare Programs',
    value: '25',
    subtitle: 'Active initiatives',
    icon: 'medical',
    variant: 'primary'
  }
}`,...(D=(R=l.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};var G,M,$;o.parameters={...o.parameters,docs:{...(G=o.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    title: 'Goals Achieved',
    value: '92%',
    subtitle: 'This year',
    icon: 'star',
    variant: 'success',
    trend: 'up',
    trendValue: '+5%'
  }
}`,...($=(M=o.parameters)==null?void 0:M.docs)==null?void 0:$.source}}};var q,E,H;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    title: 'Pending Reviews',
    value: '47',
    subtitle: 'Require attention',
    icon: 'star',
    variant: 'warning'
  }
}`,...(H=(E=c.parameters)==null?void 0:E.docs)==null?void 0:H.source}}};var I,O,W;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    title: 'Critical Issues',
    value: '3',
    subtitle: 'Need immediate action',
    icon: 'medical',
    variant: 'danger'
  }
}`,...(W=(O=d.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var L,_,F;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" style={{
    width: '800px'
  }}>\r
      <StatCard title="Total Donations" value="$45,230" subtitle="This month" icon="heart" variant="default" />\r
      <StatCard title="Healthcare Programs" value="25" subtitle="Active initiatives" icon="medical" variant="primary" />\r
      <StatCard title="Goals Achieved" value="92%" subtitle="This year" icon="star" variant="success" trend="up" trendValue="+5%" />\r
      <StatCard title="Pending Reviews" value="47" subtitle="Require attention" icon="users" variant="warning" />\r
      <StatCard title="Critical Issues" value="3" subtitle="Need immediate action" icon="medical" variant="danger" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'All StatCard variants displayed together.'
      }
    }
  }
}`,...(F=(_=u.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var K,k,z;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{
    width: '1000px'
  }}>\r
      <StatCard title="Total Donations" value="$127,450" subtitle="All time" icon="heart" trend="up" trendValue="+23%" variant="primary" />\r
      <StatCard title="People Served" value="15,230" subtitle="This year" icon="users" trend="up" trendValue="+18%" variant="success" />\r
      <StatCard title="Active Volunteers" value="342" subtitle="Currently active" icon="users" trend="up" trendValue="+12%" />\r
      <StatCard title="Healthcare Programs" value="28" subtitle="Running programs" icon="medical" trend="neutral" trendValue="0%" />\r
      <StatCard title="Villages Reached" value="156" subtitle="Across Ghana" icon="globe" trend="up" trendValue="+8%" />\r
      <StatCard title="Medical Screenings" value="8,420" subtitle="This quarter" icon="medical" trend="up" trendValue="+25%" variant="success" />\r
      <StatCard title="Nutrition Programs" value="12" subtitle="Active programs" icon="heart" trend="up" trendValue="+3%" />\r
      <StatCard title="Community Events" value="45" subtitle="This month" icon="star" trend="down" trendValue="-5%" variant="warning" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example of StatCards used in an NGO dashboard context with real-world metrics.'
      }
    }
  }
}`,...(z=(k=p.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var B,J,Q;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{
    width: '600px'
  }}>\r
      <StatCard title="Total Impact" value="1.2M" subtitle="Lives touched" icon="heart" variant="primary" />\r
      <StatCard title="Funds Raised" value="$2.8M" subtitle="Since inception" icon="star" variant="success" />\r
      <StatCard title="Global Reach" value="50K+" subtitle="Communities served" icon="globe" variant="default" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Examples of StatCards displaying large numbers with appropriate formatting.'
      }
    }
  }
}`,...(Q=(J=m.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const se=["Default","WithIcon","WithTrend","NegativeTrend","NeutralTrend","Primary","Success","Warning","Danger","AllVariants","NGODashboard","LargeNumbers"];export{u as AllVariants,d as Danger,r as Default,m as LargeNumbers,p as NGODashboard,s as NegativeTrend,n as NeutralTrend,l as Primary,o as Success,c as Warning,a as WithIcon,i as WithTrend,se as __namedExportsOrder,ie as default};
