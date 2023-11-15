import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/common/Header";
import Modal from "../../../components/register/Modal";
import { policyDummy1, policyDummy2 } from "./TermsPolicy";

const isCheckedIcon = (isChecked: boolean) => {
  return isChecked ? (
    <FontAwesomeIcon
      icon={faCheckCircle}
      color="#0064FF"
      className="pr-3 font-thin text-xl"
    />
  ) : (
    <FontAwesomeIcon
      icon={faCircle}
      color="gray"
      className="pr-3 font-thin text-xl"
    />
  );
};

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {isCheckedIcon(checked)}
    </div>
  );
};

const Terms: React.FC = () => {
  const [agreedToAll, setAgreedToAll] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacyPolicy, setAgreedToPrivacyPolicy] = useState(false);
  const [optInForEmails, setOptInForEmails] = useState(false);
  const navigate = useNavigate();

  const handleAgreeToAll = () => {
    const newValue = !agreedToAll;
    setAgreedToAll(newValue);
    setAgreedToTerms(newValue);
    setAgreedToPrivacyPolicy(newValue);
    setOptInForEmails(newValue);
  };

  const handleAgreeToTerms = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const handleAgreeToPrivacyPolicy = () => {
    setAgreedToPrivacyPolicy(!agreedToPrivacyPolicy);
  };

  const handleOptInForEmails = () => {
    setOptInForEmails(!optInForEmails);
  };

  interface Agreement {
    label: string;
    checked: boolean;
    onChange: () => void;
    content: string;
  }

  const agreements: Agreement[] = [
    {
      label: "[필수] 서비스 이용약관 동의",
      checked: agreedToTerms,
      onChange: handleAgreeToTerms,
      content: policyDummy1,
    },
    {
      label: "[필수] 개인정보 수집/이용 동의",
      checked: agreedToPrivacyPolicy,
      onChange: handleAgreeToPrivacyPolicy,
      content: policyDummy2,
    },
    {
      label: "[선택] 메일/문자 수신 동의",
      checked: optInForEmails,
      onChange: handleOptInForEmails,
      content: "메일/문자 수신 동의 내용...",
    },
  ];

  const [modalContent, setModalContent] = useState<string | null>(null);

  const openModal = (content: string) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div>
      <Header menu="회원가입" showBackArrow={true} />
      {modalContent && <Modal content={modalContent} onClose={closeModal} />}
      <div className=" items-center h-screen px-3 py-3">
        <div>
          <div className="flex space-x-2 pt-4" onClick={handleAgreeToAll}>
            <input type="checkbox" checked={agreedToAll} className="sr-only" />
            {isCheckedIcon(agreedToAll)}
            <span className="text-sm">모두 동의합니다</span>
          </div>
          <hr className="w-[90%] mx-auto justify-center border-t-1 border-gray-200 my-4" />

          <div className="space-y-2 justify-between ">
            {agreements.map((agreement, index) => (
              <div
                className="flex items-center space-x-2 py-2"
                onClick={agreement.onChange}
                key={index}
              >
                <Checkbox
                  checked={agreement.checked}
                  onChange={agreement.onChange}
                />
                <span className="text-sm">{agreement.label}</span>
                <div
                  className="absolute right-8 text-gray-600"
                  onClick={() => {
                    openModal(agreement.content);
                  }}
                >
                  {">"}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4">
          <button
            className={`${
              agreedToPrivacyPolicy && agreedToTerms
                ? "bg-customColor"
                : "bg-gray-400"
            } text-white py-2.5 px-4 rounded-lg w-full`}
            onClick={() => {
              if (agreedToPrivacyPolicy && agreedToTerms) {
                navigate("/register");
              }
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
