const LoadingScreen = () => {
  return (
    <div className="min-h-screen pb-20">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LoadingScreen;
