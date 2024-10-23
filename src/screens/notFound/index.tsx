
export default function NotFound() {
  return (
    <div className="bg-[#E8E9EB] h-screen flex flex-col items-center justify-between">
        <div/>
        <div className="flex flex-col items-center">
            <h1 className="text-9xl text-blue">404</h1>
            <p className="text-4xl text-blue font-medium">Page Not Found</p>
            <p className="mt-4 mb-8 text-4xl">It seems you went out of track!</p>
        </div>
        <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-2xl">Couldn't find what you were looking for?</p>
            <a className="text-lg text-blue underline hover:text-cyan-500" href="javascript:history.back()">Click here to go back</a>
        </div>
    </div>
  );
}
