import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{H as o}from"./Header-Dh5citJj.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";import"./Button-D3xp6VxQ.js";import"./Icon-DtfCRbnF.js";import"./UserProfile-Dmhx1I-c.js";import"./Avatar-BirX1KMm.js";import"./Badge-DFuacdIg.js";const ie={title:"Organisms/Header",component:o,parameters:{layout:"fullscreen",docs:{description:{component:"Header component with logo, navigation, user profile, and mobile menu functionality."}}},argTypes:{logo:{control:{type:"object"},description:"Logo object with src and alt properties"},navigation:{control:{type:"object"},description:"Array of navigation items with label and href"},user:{control:{type:"object"},description:"User object for authenticated state"},onMenuToggle:{action:"menu toggled",description:"Callback for mobile menu toggle"}}},r=[{label:"Home",href:"/"},{label:"About",href:"/about"},{label:"Projects",href:"/projects"},{label:"Get Involved",href:"/volunteer"},{label:"Contact",href:"/contact"}],f={name:"Sarah Johnson",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Volunteer Coordinator",email:"sarah@carespot.org"},a={src:"https://via.placeholder.com/120x32/2563eb/ffffff?text=CareSpot",alt:"CareSpot Logo"},s={args:{navigation:r}},t={args:{logo:a,navigation:r}},n={args:{logo:a,navigation:r,user:f}},i={args:{navigation:[{label:"Home",href:"/"},{label:"About",href:"/about"},{label:"Donate",href:"/donate"}]}},l={args:{logo:a,navigation:[{label:"Home",href:"/"},{label:"About Us",href:"/about"},{label:"Our Work",href:"/work"},{label:"Projects",href:"/projects"},{label:"Health Programs",href:"/health"},{label:"Volunteer",href:"/volunteer"},{label:"Donate",href:"/donate"},{label:"News",href:"/news"},{label:"Contact",href:"/contact"}]}},c={args:{logo:a,navigation:r,user:{name:"Michael Chen",avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Community Volunteer",email:"michael@volunteer.org"}}},d={args:{logo:a,navigation:r,user:{name:"Dr. Amara Osei",role:"Medical Director",email:"dr.osei@carespot.org"}}},m={args:{logo:a,navigation:r},parameters:{viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Header component shown in mobile viewport to demonstrate mobile menu functionality."}}}},g={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Standard NGO Header"}),e.jsx(o,{logo:a,navigation:[{label:"Home",href:"/"},{label:"Our Mission",href:"/mission"},{label:"Programs",href:"/programs"},{label:"Get Involved",href:"/volunteer"},{label:"Donate",href:"/donate"}]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Healthcare Focused"}),e.jsx(o,{navigation:[{label:"Home",href:"/"},{label:"Health Services",href:"/health"},{label:"Medical Programs",href:"/medical"},{label:"Community Health",href:"/community"},{label:"Support Us",href:"/support"}]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Medical Staff Portal"}),e.jsx(o,{logo:a,navigation:[{label:"Dashboard",href:"/dashboard"},{label:"Patients",href:"/patients"},{label:"Programs",href:"/programs"},{label:"Reports",href:"/reports"}],user:{name:"Dr. Kwame Asante",avatar:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Chief Medical Officer",email:"dr.asante@carespot.org"}})]})]}),parameters:{docs:{description:{story:"Different header configurations for various NGO website contexts."}}}},p={render:()=>e.jsxs("div",{className:"space-y-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Desktop View"}),e.jsx("div",{className:"border rounded-lg overflow-hidden",children:e.jsx(o,{logo:a,navigation:r,user:f})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Tablet View"}),e.jsx("div",{className:"max-w-2xl border rounded-lg overflow-hidden",children:e.jsx(o,{logo:a,navigation:r,user:f})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Mobile View"}),e.jsx("div",{className:"max-w-sm border rounded-lg overflow-hidden",children:e.jsx(o,{logo:a,navigation:r})})]})]}),parameters:{docs:{description:{story:"Header component behavior across different screen sizes."}}}},h={render:()=>{const Q=X=>{console.log("Mobile menu toggled:",X)};return e.jsxs("div",{className:"space-y-4",children:[e.jsx(o,{logo:a,navigation:r,onMenuToggle:Q}),e.jsx("div",{className:"p-4 bg-gray-50 rounded-lg",children:e.jsx("p",{className:"text-sm text-gray-600",children:"Try resizing your browser window or using mobile view to see the responsive menu behavior. Check the console for menu toggle events."})})]})},parameters:{docs:{description:{story:"Interactive header with menu toggle functionality and event handling."}}}};var u,b,v;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    navigation: sampleNavigation
  }
}`,...(v=(b=s.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var x,w,N;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation
  }
}`,...(N=(w=t.parameters)==null?void 0:w.docs)==null?void 0:N.source}}};var j,y,H;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
    user: sampleUser
  }
}`,...(H=(y=n.parameters)==null?void 0:y.docs)==null?void 0:H.source}}};var M,S,D;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    navigation: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'About',
      href: '/about'
    }, {
      label: 'Donate',
      href: '/donate'
    }]
  }
}`,...(D=(S=i.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var O,C,L;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    logo: sampleLogo,
    navigation: [{
      label: 'Home',
      href: '/'
    }, {
      label: 'About Us',
      href: '/about'
    }, {
      label: 'Our Work',
      href: '/work'
    }, {
      label: 'Projects',
      href: '/projects'
    }, {
      label: 'Health Programs',
      href: '/health'
    }, {
      label: 'Volunteer',
      href: '/volunteer'
    }, {
      label: 'Donate',
      href: '/donate'
    }, {
      label: 'News',
      href: '/news'
    }, {
      label: 'Contact',
      href: '/contact'
    }]
  }
}`,...(L=(C=l.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var V,P,U;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'Community Volunteer',
      email: 'michael@volunteer.org'
    }
  }
}`,...(U=(P=c.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};var A,T,G;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation,
    user: {
      name: 'Dr. Amara Osei',
      role: 'Medical Director',
      email: 'dr.osei@carespot.org'
    }
  }
}`,...(G=(T=d.parameters)==null?void 0:T.docs)==null?void 0:G.source}}};var k,I,q;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    logo: sampleLogo,
    navigation: sampleNavigation
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Header component shown in mobile viewport to demonstrate mobile menu functionality.'
      }
    }
  }
}`,...(q=(I=m.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};var R,W,z;g.parameters={...g.parameters,docs:{...(R=g.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      {/* Standard NGO Header */}\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Standard NGO Header</h3>\r
        <Header logo={sampleLogo} navigation={[{
        label: 'Home',
        href: '/'
      }, {
        label: 'Our Mission',
        href: '/mission'
      }, {
        label: 'Programs',
        href: '/programs'
      }, {
        label: 'Get Involved',
        href: '/volunteer'
      }, {
        label: 'Donate',
        href: '/donate'
      }]} />\r
      </div>\r
\r
      {/* Healthcare Focus */}\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Healthcare Focused</h3>\r
        <Header navigation={[{
        label: 'Home',
        href: '/'
      }, {
        label: 'Health Services',
        href: '/health'
      }, {
        label: 'Medical Programs',
        href: '/medical'
      }, {
        label: 'Community Health',
        href: '/community'
      }, {
        label: 'Support Us',
        href: '/support'
      }]} />\r
      </div>\r
\r
      {/* With Authenticated Medical Staff */}\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Medical Staff Portal</h3>\r
        <Header logo={sampleLogo} navigation={[{
        label: 'Dashboard',
        href: '/dashboard'
      }, {
        label: 'Patients',
        href: '/patients'
      }, {
        label: 'Programs',
        href: '/programs'
      }, {
        label: 'Reports',
        href: '/reports'
      }]} user={{
        name: 'Dr. Kwame Asante',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        role: 'Chief Medical Officer',
        email: 'dr.asante@carespot.org'
      }} />\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different header configurations for various NGO website contexts.'
      }
    }
  }
}`,...(z=(W=g.parameters)==null?void 0:W.docs)==null?void 0:z.source}}};var E,F,_;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <div className="space-y-8">\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Desktop View</h3>\r
        <div className="border rounded-lg overflow-hidden">\r
          <Header logo={sampleLogo} navigation={sampleNavigation} user={sampleUser} />\r
        </div>\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Tablet View</h3>\r
        <div className="max-w-2xl border rounded-lg overflow-hidden">\r
          <Header logo={sampleLogo} navigation={sampleNavigation} user={sampleUser} />\r
        </div>\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Mobile View</h3>\r
        <div className="max-w-sm border rounded-lg overflow-hidden">\r
          <Header logo={sampleLogo} navigation={sampleNavigation} />\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Header component behavior across different screen sizes.'
      }
    }
  }
}`,...(_=(F=p.parameters)==null?void 0:F.docs)==null?void 0:_.source}}};var B,K,J;h.parameters={...h.parameters,docs:{...(B=h.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const handleMenuToggle = isOpen => {
      console.log('Mobile menu toggled:', isOpen);
    };
    return <div className="space-y-4">\r
        <Header logo={sampleLogo} navigation={sampleNavigation} onMenuToggle={handleMenuToggle} />\r
        <div className="p-4 bg-gray-50 rounded-lg">\r
          <p className="text-sm text-gray-600">\r
            Try resizing your browser window or using mobile view to see the responsive menu behavior.\r
            Check the console for menu toggle events.\r
          </p>\r
        </div>\r
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive header with menu toggle functionality and event handling.'
      }
    }
  }
}`,...(J=(K=h.parameters)==null?void 0:K.docs)==null?void 0:J.source}}};const le=["Default","WithLogo","AuthenticatedUser","MinimalNavigation","ExtendedNavigation","VolunteerUser","StaffUser","MobileMenuDemo","NGOHeaderVariations","ResponsiveBehavior","InteractiveDemo"];export{n as AuthenticatedUser,s as Default,l as ExtendedNavigation,h as InteractiveDemo,i as MinimalNavigation,m as MobileMenuDemo,g as NGOHeaderVariations,p as ResponsiveBehavior,d as StaffUser,c as VolunteerUser,t as WithLogo,le as __namedExportsOrder,ie as default};
