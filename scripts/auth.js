// ID를 통해 타겟 input 요소에 접근
const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const passwordConfirmationInput = document.getElementById(
  "passwordConfirmation"
);

// 오류 메세지 노출 함수 (오류 메시지 <span>을 visible하게 만들고 입력 필드에 빨간색 테두리를 추가)
// - 코드 중복을 줄이기 위해 반복되는 코드를 함수화해 주었어요. (DRY 원칙, "Don't Repeat Yourself")
// - 오류 메시지 요소 직접 접근 대신, 오류 메시지 ID를 함수에 전달
function showError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "block";
  input.style.border = "1px solid #f74747";
}

// 상태 초기화 함수 (오류 메시지를 숨기고 입력 필드의 테두리를 기본 상태로 리셋)
function hideError(input, errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = "none";
  input.style.border = "none";
}

// 이메일 유효성 검증 util function
// - 정규표현식(Regular Expression, Regex)을 통해 입력된 값이 기본적인 이메일 형식을 따르고 있는지 확인 후 boolean을 리턴합니다.
// - 이메일 형식을 검증하는 다양한 정규식이 존재하는데 너무 엄격하지도, 너무 느슨하지도 않은 실용적인 버전을 사용하는 게 좋아요.
// - 예시에 사용된 정규식은 보편적으로 사용되는 이메일 주소 형식에 대해서는 높은 검증 성공률을 보이지만, 특수한 도메인의 이메일을 포착하는 데에는 한계가 있을 수 있기 때문에 완벽한 솔루션은 아니에요.
function isEmailValid(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

// 이메일 필드의 유효성 검사 (입력 여부 및 형식)
function validateEmailField() {
  const emailValue = emailInput.value.trim(); // 입력값의 앞뒤 공백(whitespace) 제거

  // 오류 메세지 및 입력 필드의 상태를 먼저 초기화
  // - 사용자가 입력한 값이 유효성 검사를 통과하지 못해 오류 메시지가 한 번 표시된 이후 입력값을 수정하여 필드가 유효한 상태가 되었을 때 오류 메시지를 다시 숨김 처리하기 위한 용도
  // - 두 가지 오류 메세지가 동시에 노출되지 않도록 하기 위한 용도
  hideError(emailInput, "emailEmptyError");
  hideError(emailInput, "emailInvalidError");

  if (!emailValue) {
    showError(emailInput, "emailEmptyError");
  } else if (!isEmailValid(emailValue)) {
    showError(emailInput, "emailInvalidError");
  }
}

// 닉네임 필드의 유효성 검사
function validateNicknameField() {
  hideError(nicknameInput, "nicknameEmptyError");

  if (!nicknameInput.value.trim()) {
    showError(nicknameInput, "nicknameEmptyError");
  }
}

// 비밀번호 필드의 유효성 검사 상태를 저장하는 전역 변수
// - 비밀번호 입력 전에 비밀번호 확인 필드 입력을 먼저 시도하는 경우를 대비해 검증 로직 강화
let isPasswordValid = false;

// 비밀번호 필드의 유효성 검사
function validatePasswordField() {
  const passwordValue = passwordInput.value.trim();
  isPasswordValid = passwordValue && passwordValue.length >= 8; // 유효성 검사 상태 업데이트

  hideError(passwordInput, "passwordEmptyError");
  hideError(passwordInput, "passwordInvalidError");

  if (!passwordValue) {
    showError(passwordInput, "passwordEmptyError");
  } else if (!isPasswordValid) {
    showError(passwordInput, "passwordInvalidError");
  }
}

// 비밀번호 확인 필드의 유효성 검사
function validatePasswordConfirmationField() {
  hideError(passwordConfirmationInput, "passwordConfirmationError");
  hideError(passwordConfirmationInput, "passwordConfirmationInitError");

  if (passwordInput.value.trim() !== passwordConfirmationInput.value.trim()) {
    showError(passwordConfirmationInput, "passwordConfirmationError");
  }
}

// 비밀번호 입력 전에 비밀번호 확인 필드 입력을 먼저 시도하는 만일의 경우를 대비한 검증 로직
// - 비밀번호 확인 필드에서 focus out됐을 때가 아닌, 입력 시 실행하기 위해 validatePasswordConfirmationField 함수와 분리함
function initializePasswordConfirmation() {
  hideError(passwordConfirmationInput, "passwordConfirmationError");
  hideError(passwordConfirmationInput, "passwordConfirmationInitError");

  if (!isPasswordValid) {
    showError(passwordConfirmationInput, "passwordConfirmationInitError");
  }
}

// 입력 필드에 이벤트 리스너 추가
// - 회원가입 및 로그인 form에서는 사용자가 입력한 데이터의 유효성을 즉각적으로 검증하고 피드백을 제공하기 위해서 focusout, input, change 등의 input event를 많이 사용해요.
// - 선택사항: `DOMContentLoaded` 이벤트 리스너를 사용해 DOM 요소들이 완전히 로드된 후에 이벤트 리스너를 등록하면, 스크립트 태그의 위치와 상관 없이 DOM 요소를 안전하게 참조할 수 있어요.
//   현재 HTML 구조에서는 자바스크립트 파일이 문서의 마지막에 위치해 있기 때문에 DOMContentLoaded 없이 바로 이벤트 리스너들을 추가해도 문제 없어요.
//   스크립트의 위치를 문서 상단으로 이동하거나, 동적으로 스크립트를 로드하는 경우에는 DOMContentLoaded 이벤트 리스너 내부에서 이벤트 리스너들을 등록하는 것이 안전해요.

document.addEventListener("DOMContentLoaded", () => {
  // 입력 필드 선택 후 focus out 했을 때 각 필드에 해당하는 유효성 검증 함수를 호출
  emailInput.addEventListener("focusout", validateEmailField);
  nicknameInput.addEventListener("focusout", validateNicknameField);
  passwordInput.addEventListener("focusout", validatePasswordField);
  passwordConfirmationInput.addEventListener(
    "focusout",
    validatePasswordConfirmationField
  );
  // 비밀번호 확인 필드 입력 시 비밀번호 필드에 정상적인 입력값이 있는지 바로 확인 및 오류 메세지 표시
  passwordConfirmationInput.addEventListener(
    "input",
    initializePasswordConfirmation
  );
});
