import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as s}from"./StatsGrid-BoXCD6fm.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";import"./StatCard-ChSFsgah.js";import"./Icon-DtfCRbnF.js";import"./Badge-DFuacdIg.js";const ie={title:"Organisms/StatsGrid",component:s,parameters:{layout:"padded",docs:{description:{component:"StatsGrid component for displaying multiple statistics in a responsive grid layout."}}},argTypes:{stats:{control:{type:"object"},description:"Array of stat objects to display"},columns:{control:{type:"select"},options:[1,2,3,4],description:"Number of columns in the grid"}}},t=[{id:1,title:"Total Donations",value:"$127,450",subtitle:"All time",icon:"heart",trend:"up",trendValue:"+23%",variant:"primary"},{id:2,title:"People Served",value:"15,230",subtitle:"This year",icon:"users",trend:"up",trendValue:"+18%",variant:"success"},{id:3,title:"Active Volunteers",value:"342",subtitle:"Currently active",icon:"users",trend:"up",trendValue:"+12%"},{id:4,title:"Healthcare Programs",value:"28",subtitle:"Running programs",icon:"medical",trend:"neutral",trendValue:"0%"}],X=[{id:1,title:"Medical Screenings",value:"8,420",subtitle:"This quarter",icon:"medical",trend:"up",trendValue:"+25%",variant:"success"},{id:2,title:"Villages Reached",value:"156",subtitle:"Across Ghana",icon:"globe",trend:"up",trendValue:"+8%",variant:"primary"},{id:3,title:"Health Workers Trained",value:"89",subtitle:"This year",icon:"users",trend:"up",trendValue:"+15%"},{id:4,title:"Emergency Cases",value:"234",subtitle:"Handled this month",icon:"medical",trend:"down",trendValue:"-12%",variant:"warning"},{id:5,title:"Nutrition Programs",value:"12",subtitle:"Active programs",icon:"heart",trend:"up",trendValue:"+3%"},{id:6,title:"Community Events",value:"45",subtitle:"This month",icon:"star",trend:"down",trendValue:"-5%",variant:"warning"}],n={args:{stats:t,columns:4}},a={args:{stats:t.slice(0,3),columns:1}},r={args:{stats:t,columns:2}},i={args:{stats:t.slice(0,3),columns:3}},o={args:{stats:t,columns:4}},l={args:{stats:X,columns:3},parameters:{docs:{description:{story:"Healthcare-focused statistics grid showing medical program metrics."}}}},c={args:{stats:[{id:1,title:"Lives Impacted",value:"50,000+",subtitle:"Since 2020",icon:"heart",variant:"primary"},{id:2,title:"Communities Served",value:"200+",subtitle:"Across West Africa",icon:"globe",variant:"success"},{id:3,title:"Healthcare Workers",value:"150",subtitle:"Trained professionals",icon:"users",variant:"info"}],columns:3},parameters:{docs:{description:{story:"High-level impact statistics for NGO overview pages."}}}},d={args:{stats:[{id:1,title:"Total Raised",value:"$2.8M",subtitle:"All time",icon:"star",trend:"up",trendValue:"+15%",variant:"success"},{id:2,title:"This Month",value:"$45,230",subtitle:"March 2024",icon:"heart",trend:"up",trendValue:"+8%",variant:"primary"},{id:3,title:"Program Funding",value:"85%",subtitle:"Of goal reached",icon:"star",trend:"up",trendValue:"+5%",variant:"warning"},{id:4,title:"Donors",value:"1,250",subtitle:"Active supporters",icon:"users",trend:"up",trendValue:"+12%"}],columns:4},parameters:{docs:{description:{story:"Financial statistics grid for donation and fundraising overview."}}}},u={args:{stats:[{id:1,title:"Active Volunteers",value:"342",subtitle:"Currently active",icon:"users",trend:"up",trendValue:"+12%",variant:"success"},{id:2,title:"Volunteer Hours",value:"12,450",subtitle:"This year",icon:"star",trend:"up",trendValue:"+25%",variant:"primary"},{id:3,title:"New Applications",value:"89",subtitle:"This month",icon:"users",trend:"up",trendValue:"+18%"},{id:4,title:"Training Sessions",value:"24",subtitle:"Completed",icon:"star",trend:"neutral",trendValue:"0%"}],columns:2},parameters:{docs:{description:{story:"Volunteer program statistics and metrics."}}}},m={args:{stats:[{id:1,title:"Successful Projects",value:"95%",subtitle:"Completion rate",icon:"star",trend:"up",trendValue:"+3%",variant:"success"},{id:2,title:"Pending Reviews",value:"47",subtitle:"Require attention",icon:"star",trend:"up",trendValue:"+12%",variant:"warning"},{id:3,title:"Critical Issues",value:"3",subtitle:"Need immediate action",icon:"medical",trend:"down",trendValue:"-2",variant:"danger"},{id:4,title:"New Initiatives",value:"8",subtitle:"In planning",icon:"globe",variant:"primary"}],columns:4},parameters:{docs:{description:{story:"Statistics grid showing different variants and status types."}}}},p={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"4 Columns (Desktop)"}),e.jsx(s,{stats:t,columns:4})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"3 Columns (Tablet)"}),e.jsx("div",{className:"max-w-4xl",children:e.jsx(s,{stats:t.slice(0,3),columns:3})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"2 Columns (Small Tablet)"}),e.jsx("div",{className:"max-w-2xl",children:e.jsx(s,{stats:t.slice(0,2),columns:2})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"1 Column (Mobile)"}),e.jsx("div",{className:"max-w-sm",children:e.jsx(s,{stats:t.slice(0,2),columns:1})})]})]}),parameters:{docs:{description:{story:"StatsGrid responsive behavior across different screen sizes."}}}},v={args:{stats:[...X,{id:7,title:"Mobile Clinics",value:"15",subtitle:"Operating daily",icon:"medical",trend:"up",trendValue:"+2",variant:"primary"},{id:8,title:"Partnerships",value:"32",subtitle:"Active collaborations",icon:"globe",trend:"up",trendValue:"+5",variant:"success"}],columns:4},parameters:{docs:{description:{story:"StatsGrid with a larger dataset showing comprehensive metrics."}}}};var g,h,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    stats: sampleStats,
    columns: 4
  }
}`,...(b=(h=n.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};var S,y,V;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 1
  }
}`,...(V=(y=a.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};var f,w,x;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    stats: sampleStats,
    columns: 2
  }
}`,...(x=(w=r.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var C,N,T;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 3
  }
}`,...(T=(N=i.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};var j,A,G;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    stats: sampleStats,
    columns: 4
  }
}`,...(G=(A=o.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};var O,M,H;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    stats: healthcareStats,
    columns: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'Healthcare-focused statistics grid showing medical program metrics.'
      }
    }
  }
}`,...(H=(M=l.parameters)==null?void 0:M.docs)==null?void 0:H.source}}};var D,P,R;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    stats: [{
      id: 1,
      title: 'Lives Impacted',
      value: '50,000+',
      subtitle: 'Since 2020',
      icon: 'heart',
      variant: 'primary'
    }, {
      id: 2,
      title: 'Communities Served',
      value: '200+',
      subtitle: 'Across West Africa',
      icon: 'globe',
      variant: 'success'
    }, {
      id: 3,
      title: 'Healthcare Workers',
      value: '150',
      subtitle: 'Trained professionals',
      icon: 'users',
      variant: 'info'
    }],
    columns: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'High-level impact statistics for NGO overview pages.'
      }
    }
  }
}`,...(R=(P=c.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var I,F,k;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    stats: [{
      id: 1,
      title: 'Total Raised',
      value: '$2.8M',
      subtitle: 'All time',
      icon: 'star',
      trend: 'up',
      trendValue: '+15%',
      variant: 'success'
    }, {
      id: 2,
      title: 'This Month',
      value: '$45,230',
      subtitle: 'March 2024',
      icon: 'heart',
      trend: 'up',
      trendValue: '+8%',
      variant: 'primary'
    }, {
      id: 3,
      title: 'Program Funding',
      value: '85%',
      subtitle: 'Of goal reached',
      icon: 'star',
      trend: 'up',
      trendValue: '+5%',
      variant: 'warning'
    }, {
      id: 4,
      title: 'Donors',
      value: '1,250',
      subtitle: 'Active supporters',
      icon: 'users',
      trend: 'up',
      trendValue: '+12%'
    }],
    columns: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'Financial statistics grid for donation and fundraising overview.'
      }
    }
  }
}`,...(k=(F=d.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var W,$,E;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    stats: [{
      id: 1,
      title: 'Active Volunteers',
      value: '342',
      subtitle: 'Currently active',
      icon: 'users',
      trend: 'up',
      trendValue: '+12%',
      variant: 'success'
    }, {
      id: 2,
      title: 'Volunteer Hours',
      value: '12,450',
      subtitle: 'This year',
      icon: 'star',
      trend: 'up',
      trendValue: '+25%',
      variant: 'primary'
    }, {
      id: 3,
      title: 'New Applications',
      value: '89',
      subtitle: 'This month',
      icon: 'users',
      trend: 'up',
      trendValue: '+18%'
    }, {
      id: 4,
      title: 'Training Sessions',
      value: '24',
      subtitle: 'Completed',
      icon: 'star',
      trend: 'neutral',
      trendValue: '0%'
    }],
    columns: 2
  },
  parameters: {
    docs: {
      description: {
        story: 'Volunteer program statistics and metrics.'
      }
    }
  }
}`,...(E=($=u.parameters)==null?void 0:$.docs)==null?void 0:E.source}}};var L,q,_;m.parameters={...m.parameters,docs:{...(L=m.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    stats: [{
      id: 1,
      title: 'Successful Projects',
      value: '95%',
      subtitle: 'Completion rate',
      icon: 'star',
      trend: 'up',
      trendValue: '+3%',
      variant: 'success'
    }, {
      id: 2,
      title: 'Pending Reviews',
      value: '47',
      subtitle: 'Require attention',
      icon: 'star',
      trend: 'up',
      trendValue: '+12%',
      variant: 'warning'
    }, {
      id: 3,
      title: 'Critical Issues',
      value: '3',
      subtitle: 'Need immediate action',
      icon: 'medical',
      trend: 'down',
      trendValue: '-2',
      variant: 'danger'
    }, {
      id: 4,
      title: 'New Initiatives',
      value: '8',
      subtitle: 'In planning',
      icon: 'globe',
      variant: 'primary'
    }],
    columns: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'Statistics grid showing different variants and status types.'
      }
    }
  }
}`,...(_=(q=m.parameters)==null?void 0:q.docs)==null?void 0:_.source}}};var z,B,J;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">4 Columns (Desktop)</h3>\r
        <StatsGrid stats={sampleStats} columns={4} />\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">3 Columns (Tablet)</h3>\r
        <div className="max-w-4xl">\r
          <StatsGrid stats={sampleStats.slice(0, 3)} columns={3} />\r
        </div>\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">2 Columns (Small Tablet)</h3>\r
        <div className="max-w-2xl">\r
          <StatsGrid stats={sampleStats.slice(0, 2)} columns={2} />\r
        </div>\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">1 Column (Mobile)</h3>\r
        <div className="max-w-sm">\r
          <StatsGrid stats={sampleStats.slice(0, 2)} columns={1} />\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'StatsGrid responsive behavior across different screen sizes.'
      }
    }
  }
}`,...(J=(B=p.parameters)==null?void 0:B.docs)==null?void 0:J.source}}};var K,Q,U;v.parameters={...v.parameters,docs:{...(K=v.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    stats: [...healthcareStats, {
      id: 7,
      title: 'Mobile Clinics',
      value: '15',
      subtitle: 'Operating daily',
      icon: 'medical',
      trend: 'up',
      trendValue: '+2',
      variant: 'primary'
    }, {
      id: 8,
      title: 'Partnerships',
      value: '32',
      subtitle: 'Active collaborations',
      icon: 'globe',
      trend: 'up',
      trendValue: '+5',
      variant: 'success'
    }],
    columns: 4
  },
  parameters: {
    docs: {
      description: {
        story: 'StatsGrid with a larger dataset showing comprehensive metrics.'
      }
    }
  }
}`,...(U=(Q=v.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};const oe=["Default","OneColumn","TwoColumns","ThreeColumns","FourColumns","HealthcareDashboard","NGOImpactOverview","FinancialOverview","VolunteerMetrics","MixedVariants","ResponsiveBehavior","LargeDataset"];export{n as Default,d as FinancialOverview,o as FourColumns,l as HealthcareDashboard,v as LargeDataset,m as MixedVariants,c as NGOImpactOverview,a as OneColumn,p as ResponsiveBehavior,i as ThreeColumns,r as TwoColumns,u as VolunteerMetrics,oe as __namedExportsOrder,ie as default};
