import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{U as r}from"./UserProfile-Dmhx1I-c.js";import"./iframe-8Oj9oEWN.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CN2ajBz0.js";import"./Avatar-BirX1KMm.js";import"./Badge-DFuacdIg.js";const ce={title:"Molecules/UserProfile",component:r,parameters:{layout:"centered",docs:{description:{component:"UserProfile component for displaying user information with avatar, name, role, and optional badges."}}},argTypes:{user:{control:{type:"object"},description:"User object containing name, avatar, role, and email"},showBadge:{control:{type:"boolean"},description:"Whether to show a badge"},badgeVariant:{control:{type:"select"},options:["default","primary","secondary","success","warning","danger","info"],description:"Badge color variant"},badgeText:{control:{type:"text"},description:"Text to display in the badge"},size:{control:{type:"select"},options:["small","medium","large","xlarge"],description:"Size of the avatar"},layout:{control:{type:"select"},options:["horizontal","vertical"],description:"Layout orientation"}},decorators:[ae=>e.jsx("div",{style:{width:"300px"},children:e.jsx(ae,{})})]},a={volunteer:{name:"Sarah Johnson",avatar:"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Community Health Volunteer",email:"sarah.johnson@carespot.org"},doctor:{name:"Dr. Michael Chen",avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Medical Director",email:"dr.chen@carespot.org"},coordinator:{name:"Amara Osei",role:"Program Coordinator",email:"amara.osei@carespot.org"},donor:{name:"Robert Williams",avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Major Donor",email:"robert.williams@email.com"}},s={args:{user:a.volunteer}},t={args:{user:a.volunteer,showBadge:!0,badgeText:"Active",badgeVariant:"success"}},o={args:{user:a.coordinator,showBadge:!0,badgeText:"Staff",badgeVariant:"primary"}},i={args:{user:a.volunteer,size:"small"}},d={args:{user:a.volunteer,size:"medium"}},n={args:{user:a.volunteer,size:"large"}},c={args:{user:a.volunteer,size:"xlarge"}},l={args:{user:a.doctor,layout:"horizontal",showBadge:!0,badgeText:"Medical",badgeVariant:"info"}},m={args:{user:a.doctor,layout:"vertical",showBadge:!0,badgeText:"Medical",badgeVariant:"info"}},u={render:()=>e.jsxs("div",{className:"space-y-4",children:[e.jsx(r,{user:a.volunteer,showBadge:!0,badgeText:"Active",badgeVariant:"success"}),e.jsx(r,{user:a.doctor,showBadge:!0,badgeText:"Medical",badgeVariant:"info"}),e.jsx(r,{user:a.coordinator,showBadge:!0,badgeText:"Staff",badgeVariant:"primary"}),e.jsx(r,{user:a.donor,showBadge:!0,badgeText:"VIP",badgeVariant:"warning"})]}),parameters:{docs:{description:{story:"Different badge variants used with user profiles."}}}},g={render:()=>e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Medical Team"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{user:{name:"Dr. Kwame Asante",avatar:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Chief Medical Officer",email:"dr.asante@carespot.org"},showBadge:!0,badgeText:"Lead",badgeVariant:"primary"}),e.jsx(r,{user:{name:"Dr. Fatima Al-Rashid",avatar:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Pediatric Specialist",email:"dr.alrashid@carespot.org"},showBadge:!0,badgeText:"Specialist",badgeVariant:"info"}),e.jsx(r,{user:{name:"Nurse Grace Mensah",avatar:"https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",role:"Head Nurse",email:"grace.mensah@carespot.org"},showBadge:!0,badgeText:"Nursing",badgeVariant:"success"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-4",children:"Community Volunteers"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx(r,{user:{name:"Emmanuel Boateng",role:"Community Health Worker",email:"emmanuel.boateng@volunteer.org"},showBadge:!0,badgeText:"Volunteer",badgeVariant:"secondary"}),e.jsx(r,{user:{name:"Akosua Frimpong",role:"Health Educator",email:"akosua.frimpong@volunteer.org"},showBadge:!0,badgeText:"Educator",badgeVariant:"warning"})]})]})]}),parameters:{docs:{description:{story:"Example of UserProfile components used to showcase team members in different roles."}}}},p={render:()=>e.jsxs("div",{className:"space-y-2",children:[e.jsx(r,{user:a.volunteer,size:"small",showBadge:!0,badgeText:"Online",badgeVariant:"success"}),e.jsx(r,{user:a.doctor,size:"small",showBadge:!0,badgeText:"Busy",badgeVariant:"warning"}),e.jsx(r,{user:a.coordinator,size:"small",showBadge:!0,badgeText:"Away",badgeVariant:"danger"}),e.jsx(r,{user:a.donor,size:"small",showBadge:!0,badgeText:"Offline",badgeVariant:"default"})]}),parameters:{docs:{description:{story:"Compact list view with small avatars and status badges."}}}},h={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",style:{width:"600px"},children:[e.jsxs("div",{className:"p-4 border rounded-lg",children:[e.jsx(r,{user:a.doctor,layout:"vertical",size:"large",showBadge:!0,badgeText:"Medical Director",badgeVariant:"primary"}),e.jsx("p",{className:"mt-3 text-sm text-gray-600 text-center",children:"Leading our medical initiatives across Ghana with over 15 years of experience."})]}),e.jsxs("div",{className:"p-4 border rounded-lg",children:[e.jsx(r,{user:a.volunteer,layout:"vertical",size:"large",showBadge:!0,badgeText:"Top Volunteer",badgeVariant:"success"}),e.jsx("p",{className:"mt-3 text-sm text-gray-600 text-center",children:"Dedicated community health volunteer serving rural communities for 3 years."})]})]}),parameters:{docs:{description:{story:"UserProfile components used in card layouts with additional context."}}}};var b,f,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.volunteer
  }
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var v,w,y;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.volunteer,
    showBadge: true,
    badgeText: 'Active',
    badgeVariant: 'success'
  }
}`,...(y=(w=t.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var V,B,T;o.parameters={...o.parameters,docs:{...(V=o.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.coordinator,
    showBadge: true,
    badgeText: 'Staff',
    badgeVariant: 'primary'
  }
}`,...(T=(B=o.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var U,j,N;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.volunteer,
    size: 'small'
  }
}`,...(N=(j=i.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var P,z,S;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.volunteer,
    size: 'medium'
  }
}`,...(S=(z=d.parameters)==null?void 0:z.docs)==null?void 0:S.source}}};var M,A,C;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.volunteer,
    size: 'large'
  }
}`,...(C=(A=n.parameters)==null?void 0:A.docs)==null?void 0:C.source}}};var D,L,E;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.volunteer,
    size: 'xlarge'
  }
}`,...(E=(L=c.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var q,H,O;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.doctor,
    layout: 'horizontal',
    showBadge: true,
    badgeText: 'Medical',
    badgeVariant: 'info'
  }
}`,...(O=(H=l.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var W,k,F;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    user: sampleUsers.doctor,
    layout: 'vertical',
    showBadge: true,
    badgeText: 'Medical',
    badgeVariant: 'info'
  }
}`,...(F=(k=m.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var G,R,_;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="space-y-4">\r
      <UserProfile user={sampleUsers.volunteer} showBadge={true} badgeText="Active" badgeVariant="success" />\r
      <UserProfile user={sampleUsers.doctor} showBadge={true} badgeText="Medical" badgeVariant="info" />\r
      <UserProfile user={sampleUsers.coordinator} showBadge={true} badgeText="Staff" badgeVariant="primary" />\r
      <UserProfile user={sampleUsers.donor} showBadge={true} badgeText="VIP" badgeVariant="warning" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Different badge variants used with user profiles.'
      }
    }
  }
}`,...(_=(R=u.parameters)==null?void 0:R.docs)==null?void 0:_.source}}};var I,K,X;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <div className="space-y-6">\r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Medical Team</h3>\r
        <div className="space-y-3">\r
          <UserProfile user={{
          name: 'Dr. Kwame Asante',
          avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          role: 'Chief Medical Officer',
          email: 'dr.asante@carespot.org'
        }} showBadge={true} badgeText="Lead" badgeVariant="primary" />\r
          <UserProfile user={{
          name: 'Dr. Fatima Al-Rashid',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          role: 'Pediatric Specialist',
          email: 'dr.alrashid@carespot.org'
        }} showBadge={true} badgeText="Specialist" badgeVariant="info" />\r
          <UserProfile user={{
          name: 'Nurse Grace Mensah',
          avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          role: 'Head Nurse',
          email: 'grace.mensah@carespot.org'
        }} showBadge={true} badgeText="Nursing" badgeVariant="success" />\r
        </div>\r
      </div>\r
      \r
      <div>\r
        <h3 className="text-lg font-semibold mb-4">Community Volunteers</h3>\r
        <div className="space-y-3">\r
          <UserProfile user={{
          name: 'Emmanuel Boateng',
          role: 'Community Health Worker',
          email: 'emmanuel.boateng@volunteer.org'
        }} showBadge={true} badgeText="Volunteer" badgeVariant="secondary" />\r
          <UserProfile user={{
          name: 'Akosua Frimpong',
          role: 'Health Educator',
          email: 'akosua.frimpong@volunteer.org'
        }} showBadge={true} badgeText="Educator" badgeVariant="warning" />\r
        </div>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Example of UserProfile components used to showcase team members in different roles.'
      }
    }
  }
}`,...(X=(K=g.parameters)==null?void 0:K.docs)==null?void 0:X.source}}};var J,Q,Y;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <div className="space-y-2">\r
      <UserProfile user={sampleUsers.volunteer} size="small" showBadge={true} badgeText="Online" badgeVariant="success" />\r
      <UserProfile user={sampleUsers.doctor} size="small" showBadge={true} badgeText="Busy" badgeVariant="warning" />\r
      <UserProfile user={sampleUsers.coordinator} size="small" showBadge={true} badgeText="Away" badgeVariant="danger" />\r
      <UserProfile user={sampleUsers.donor} size="small" showBadge={true} badgeText="Offline" badgeVariant="default" />\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'Compact list view with small avatars and status badges.'
      }
    }
  }
}`,...(Y=(Q=p.parameters)==null?void 0:Q.docs)==null?void 0:Y.source}}};var Z,$,ee;h.parameters={...h.parameters,docs:{...(Z=h.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{
    width: '600px'
  }}>\r
      <div className="p-4 border rounded-lg">\r
        <UserProfile user={sampleUsers.doctor} layout="vertical" size="large" showBadge={true} badgeText="Medical Director" badgeVariant="primary" />\r
        <p className="mt-3 text-sm text-gray-600 text-center">\r
          Leading our medical initiatives across Ghana with over 15 years of experience.\r
        </p>\r
      </div>\r
      \r
      <div className="p-4 border rounded-lg">\r
        <UserProfile user={sampleUsers.volunteer} layout="vertical" size="large" showBadge={true} badgeText="Top Volunteer" badgeVariant="success" />\r
        <p className="mt-3 text-sm text-gray-600 text-center">\r
          Dedicated community health volunteer serving rural communities for 3 years.\r
        </p>\r
      </div>\r
    </div>,
  parameters: {
    docs: {
      description: {
        story: 'UserProfile components used in card layouts with additional context.'
      }
    }
  }
}`,...(ee=($=h.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};const le=["Default","WithBadge","WithoutAvatar","Small","Medium","Large","XLarge","Horizontal","Vertical","BadgeVariants","TeamShowcase","CompactList","CardLayout"];export{u as BadgeVariants,h as CardLayout,p as CompactList,s as Default,l as Horizontal,n as Large,d as Medium,i as Small,g as TeamShowcase,m as Vertical,t as WithBadge,o as WithoutAvatar,c as XLarge,le as __namedExportsOrder,ce as default};
