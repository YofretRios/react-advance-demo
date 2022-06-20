type Props = {
  children: JSX.Element,
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {children}
    </div>
  )
}

export default Layout;