import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center h-screen bg-gradient-to-b from-primary-default from-0% to-white to-35%">
      <div className="flex flex-col px-10 mx-auto gap-y-8">
        <div className="flex flex-col gap-y-3 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="88"
            viewBox="0 -960 960 960"
            width="88"
            fill="#f43f5e"
          >
            <path d="M109.23-160 480-800l370.77 640H109.23ZM178-200h604L480-720 178-200Zm302-55.385q10.462 0 17.539-7.076 7.076-7.077 7.076-17.539 0-10.462-7.076-17.539-7.077-7.076-17.539-7.076-10.462 0-17.539 7.076-7.076 7.077-7.076 17.539 0 10.462 7.076 17.539 7.077 7.076 17.539 7.076Zm-20-89.23h40v-200h-40v200ZM480-460Z" />
          </svg>
          <p className="text-base text-center text-slate-800">개발 중인 페이지입니다.</p>
        </div>
        <div className="flex justify-center">
          <Link to="/home">
            <button className="bg-primary-default font-medium text-sm text-white shadow py-2.5 px-20 rounded-lg hover:bg-opacity-80">
              홈으로 이동
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
