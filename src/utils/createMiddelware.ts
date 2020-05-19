// this ass heigher order component
// HOC
export const createMiddelware = (middlewareFun:any, resolverFun:any) => (
  parent: any,
  args: any,
  context: any,
  info: any
) => middlewareFun(resolverFun, parent, args, context, info);
