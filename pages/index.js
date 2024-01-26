import How from './compernent/post'
import Three from './compernent/threething'
import Title from './compernent/title'
export default function Home() {
  return (
    <div>
      <h1>หน้าแรก</h1>
      <div className="w-full justify-center flex">
        <div className="text-3xl w-3/5 font-bold flex justify-center">
          <div>
            <div>
              <h1>find the best tutor in thailand</h1>
            </div>
            <div className="text-base font-normal mb-16">
              <h1>
                Crack exams, learn new skills, improve grades with the help of
                great teachers. Post your learning needs and let qualified
                tutors get in touch with you.{' '}
              </h1>
            </div>
          </div>
          <div className=" text-9xl">LOGO</div>
        </div>
      </div>
      <Title />
      <How />
      <Three />
    </div>
  )
}
