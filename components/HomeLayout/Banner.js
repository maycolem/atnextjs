import { useWindowSize } from 'hooks/useWindowSize'
import { BREAK_MOBILE } from 'utils/constants'

const Banner = () => {
  const sizeWindow = useWindowSize()
  return (
    <div className="w-full flex space-x-8">
      <div
        className="w-full md:rounded-8 bg-red-400 flex items-center justify-center text-gray-900 text-lg"
        style={{ height: '280px' }}
      >
        BANNER - {sizeWindow.width} - {sizeWindow.height}
      </div>
      {sizeWindow.width > BREAK_MOBILE && (
        <div
          className="w-1/5 rounded-8 bg-red-400 flex items-center justify-center text-gray-900 text-lg"
          style={{ height: '280px' }}
        >
          PROMO
        </div>
      )}
    </div>
  )
}

export default Banner
