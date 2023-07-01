

export default function HomeLoading() {
    // home page 
      return (
      <>
        <div className='w-full h-max flex flex-col items-center gap-y-6 fixed top-0 bg-[#202020]'>
   
        <div className='w-full h-max fixed top-0 z-20'>
          <div className='w-full h-[70px] bg-[#2a2a2a] flex justify-between items-center 
          px-5 relative top-0 border-b border-[#ffffff20]'>
            <div className="w-max h-max flex items-center gap-x-7" >
              <div className='w-[130px] h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${1*0.05}s`,
                animationDuration: "1s", }}></div>
              <div className='w-[300px] h-[28px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${2*0.05}s`,
                animationDuration: "1s", }}></div>
            </div>
            <div className="w-max h-max flex items-center gap-x-5" >
              <div className='w-[100px] h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${3*0.05}s`,
                animationDuration: "1s", }}></div>
              <div className='w-[45px] h-[45px] rounded-full bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${4*0.05}s`,
                animationDuration: "1s", }}></div>
              <div className='w-[80px] h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse'
              style={{
                animationDelay: `${5*0.05}s`,
                animationDuration: "1s", }}></div>
            </div>
          </div>
        </div>
        
        <div className='w-full min-h-screen max-h-max mt-[70px]'>
          <div className="w-full min-h-screen h-max m-0 flex justify-between">
  
            <div className="xl:w-[76%] w-[100%] h-max flex flex-col">
  
              <div className="w-full h-max overflow-hidden
              text-white min-[950px]:block hidden pt-6 px-5">
                <div className='w-full h-max overflow-hidden text-white
                flex justify-between px-1'>
                  <div className='w-[68%]'>
                    <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] animate-pulse 
                    outline-none border-none' 
                    style={{
                      animationDelay: `${1*0.05}s`,
                      animationDuration: "1s", }}></div>
                  </div>
                  <div className='w-[30%] min-h-full max-h-max bg-[#3f3f3f] animate-pulse rounded-[12px]'
                  style={{
                    animationDelay: `${2*0.05}s`,
                    animationDuration: "1s", }}></div>
                </div>
              </div>
  
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 px-6 py-6" >
                {[...Array(6)].map((_,i)=>(
                  <div key={i} className='w-full h-max flex flex-col gap-y-2 
                    border border-[#ffffff20] p-3 rounded-[12px] animate-pulse' 
                    style={{
                      animationDelay: `${i * 0.05}s`,
                      animationDuration: "1s", }} >
                    <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] outline-none border-none'></div>
                    <div className='w-full h-max flex items-center justify-between px-1 gap-x-3'>
                      <div className='w-[80%] h-max flex flex-col gap-y-2'>
                          {[...Array(2)].map((_,i)=>(
                              <div key={i} className='w-full h-[16px] rounded-[6px] bg-[#3f3f3f]'>
                              </div>
                          ))}
                      </div>
                      <p className='w-[20%] h-[40px] rounded-[6px] bg-[#3f3f3f]'></p>
                    </div>
                  </div>
                ))}
              </div>
  
            </div>
  
            <div className="xl:w-[24%] w-[0%] h-max xl:flex flex-col hidden sticky top-[70px] right-0">
              <div className="flex flex-col gap-y-4 py-6 pr-6 pl-3" >
                <p className=" w-full h-[35px] rounded-[7px] bg-[#3f3f3f] animate-pulse ml-[2px]"
                style={{
                  animationDelay: `${0.05}s`,
                  animationDuration: "1s", }}></p>
                {[...Array(6)].map((_,i)=>(
                  <div key={i} className='w-full h-max flex justify-between border border-[#ffffff20]
                  bg-[#202020a6] p-2 rounded-[8px] overflow-hidden'>
                    <div className='w-[34%] h-max'>
                      <div className='w-full aspect-[16/9] h-max rounded-[12px] bg-[#3f3f3f] animate-pulse 
                        outline-none border-none' 
                        style={{
                          animationDelay: `${i *0.05}s`,
                          animationDuration: "1s", }}>
                      </div>
                    </div>
                    <div className='w-[62%] min-h-full max-h-max flex flex-col items-start justify-between 
                    text-white overflow-hidden pb-0.5'>
                      {[...Array(2)].map((_,i)=>(
                        <p key={i} className=" w-full h-[20px] rounded-[7px] bg-[#3f3f3f] animate-pulse"
                        style={{
                          animationDelay: `${i *0.05}s`,
                          animationDuration: "1s", }}></p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
          </div>
        </div>
  
        </div>
      </>
    )
  }
  