// 입력 필드에 이벤트 리스너 추가
const emailInput = document.getElementById("email");
const nicknameInput = document.getElementById("nickname");
const passwordInput = document.getElementById("password");
const passwordConfirmationInput = document.getElementById(
  "passwordConfirmation"
);

// 입력 필드 선택 후 focus out 했을 때 각 필드에 해당하는 유효성 검증 함수를 호출
emailInput.addEventListener("focusout", validateEmailField);
nicknameInput.addEventListener("focusout", validateNicknameField);
passwordInput.addEventListener("focusout", validatePasswordField);
passwordConfirmationInput.addEventListener(
  "focusout",
  validatePasswordConfirmationField
);

// 오류 메세지 노출 함수 (오류 메시지 <span>을 표시하고 입력 필드에 빨간색 테두리를 추가)
// - 코드 중복을 줄이기 위해 반복되는 코드를 함수화해 주었어요. (DRY 원칙, "Don't Repeat Yourself")
function showError(input, error) {
  error.style.display = "block";
  input.style.border = "1px solid #f74747";
}

// 상태 초기화 함수 (오류 메시지를 숨기고 입력 필드의 테두리를 기본 상태로 리셋)
function hideError(input, error) {
  error.style.display = "none";
  input.style.border = "none";
}

// 이메일 필드의 유효성 검사 (입력 여부 및 형식)
function validateEmailField() {
  const emailValue = emailInput.value.trim(); // 입력된 이메일 값의 앞뒤 공백(whitespace) 제거

  // 오류 메세지 및 입력 필드의 상태를 먼저 초기화
  // - 사용자가 입력한 값이 유효성 검사를 통과하지 못해 오류 메시지가 한 번 표시된 이후 입력값을 수정하여 필드가 유효한 상태가 되었을 때 오류 메시지를 다시 숨김 처리하기 위한 용도 + 두 가지 오류 메세지가 동시에 노출되지 않도록 하기 위한 용도
  hideError(emailInput, emailEmptyError);
  hideError(emailInput, emailInvalidError);

  if (!emailValue) {
    showError(emailInput, emailEmptyError);
  } else if (!isValidEmail(emailValue)) {
    showError(emailInput, emailInvalidError);
  }
}

// 이메일 유효성 검증 util function
// - 정규표현식(Regular Expression, Regex)을 통해 입력된 값이 기본적인 이메일 형식을 따르고 있는지 확인 후 boolean을 리턴합니다.
// - 이메일 형식을 검증하는 다양한 정규식이 존재하는데 너무 엄격하지도, 너무 느슨하지도 않은 실용적인 버전을 사용하는 게 좋아요.
// - 예시에 사용된 정규식은 보편적으로 사용되는 이메일 주소 형식에 대해서는 높은 검증 성공률을 보이지만, 특수한 도메인의 이메일을 포착하는 데에는 한계가 있을 수 있기 때문에 완벽한 솔루션은 아니에요.

function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

// 닉네임 필드의 유효성 검사
function validateNicknameField() {
  const nicknameValue = nicknameInput.value.trim();

  hideError(nicknameInput, nicknameEmptyError);

  if (!nicknameValue) {
    showError(nicknameInput, nicknameEmptyError);
  }
}

// 비밀번호 필드의 유효성 검사
function validatePasswordField() {
  const passwordValue = passwordInput.value.trim();

  hideError(passwordInput, passwordEmptyError);
  hideError(passwordInput, passwordInvalidError);

  if (!passwordValue) {
    showError(passwordInput, passwordEmptyError);
  } else if (passwordValue.length < 8) {
    showError(passwordInput, passwordInvalidError);
  }
}

// 비밀번호 확인 필드의 유효성 검사
function validatePasswordConfirmationField() {
  const passwordValue = passwordInput.value.trim();
  const passwordConfirmationValue = passwordConfirmationInput.value.trim();
  const isMatch = passwordValue === passwordConfirmationValue;

  hideError(passwordConfirmationInput, passwordConfirmationError);
  hideError(passwordConfirmationInput, passwordConfirmationInitError);

  if (!passwordValue) {
    showError(passwordConfirmationInput, passwordConfirmationInitError);
  } else if (!passwordConfirmationValue || !isMatch) {
    showError(passwordConfirmationInput, passwordConfirmationError);
  }
}
