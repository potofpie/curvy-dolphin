const HeroText = () => {
  return (
    <div className="max-w-4xl mx-auto">
<div className="text-center mb-8 relative">
  <h2 className="text-2xl font-bold text-gray-800 mb-2 relative">
    Convert Handwritten Notes to Markdown
    <div className="absolute -top-4 left-12 w-3 h-3 bg-green-300 rounded-full border-2 border-gray-800"></div>
    <div className="absolute -top-2 right-8 w-2 h-2 bg-purple-300 rounded-full border border-gray-800"></div>
  </h2>
  <p className="text-gray-600 relative">
    Capture your notes with your camera and instantly convert them to digital Markdown format
    <div className="absolute -bottom-1 left-16 w-20 h-1 bg-orange-300 transform -rotate-1"></div>
  </p>
  <div className="absolute -right-8 top-4 w-6 h-6 border-2 border-gray-800 transform rotate-12">
    <div className="w-2 h-2 bg-red-300 rounded-full absolute top-1 left-1"></div>
  </div>
</div>
</div>
) 
}

export default HeroText;
