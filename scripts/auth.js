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

// 이메일 필드의 유효성을 검사하는 함수 (입력 여부 및 형식)
function validateEmailField() {
  const emailValue = emailInput.value.trim(); // 입력된 이메일 값의 앞뒤 공백(whitespace) 제거

  // 오류 메시지를 숨기고 입력 필드의 테두리를 기본 상태(없음)로 리셋
  // 사용자가 입력한 값이 유효성 검사를 통과하지 못해 오류 메시지가 한 번 표시된 이후 입력값을 수정하여 필드가 유효한 상태가 되었을 때 오류 메시지를 다시 숨김 처리하기 위한 용도 + 두 가지 오류 메세지가 동시에 노출되지 않도록 하기 위한 용도
  emailEmptyError.style.display = "none";
  emailInvalidError.style.display = "none";
  emailInput.style.border = "none";

  // 입력값이 비어있거나 이메일 형식에 맞지 않으면 오류 메시지를 표시하고 입력 필드에 빨간색 테두리를 추가
  if (!emailValue) {
    emailEmptyError.style.display = "block";
    emailInput.style.border = "1px solid #f74747";
  } else if (!isValidEmail(emailValue)) {
    emailInvalidError.style.display = "block";
    emailInput.style.border = "1px solid #f74747";
  }
}

// < 이메일 유효성 검증 함수 >
// 정규표현식(Regular Expression, Regex)을 통해 입력된 값이 기본적인 이메일 형식을 따르고 있는지 확인 후 boolean을 리턴합니다.
// 이메일 형식을 검증하는 다양한 정규식이 존재하는데 너무 엄격하지도, 너무 느슨하지도 않은 실용적인 버전을 사용하는 게 좋아요.
// 예시에 사용된 정규식은 보편적으로 사용되는 이메일 주소 형식에 대해서는 높은 검증 성공률을 보이지만, 특수한 도메인의 이메일을 포착하는 데에는 한계가 있을 수 있기 때문에 완벽한 솔루션은 아니에요.

function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
}

function validateNicknameField() {
  nicknameEmptyError.style.display = "none";
  nicknameInput.style.border = "none";

  if (!nicknameInput.value.trim()) {
    nicknameEmptyError.style.display = "block";
    nicknameInput.style.border = "1px solid #f74747";
  }
}

function validatePasswordField() {
  passwordEmptyError.style.display = "none";
  passwordInvalidError.style.display = "none";
  passwordInput.style.border = "none";

  if (!passwordInput.value.trim()) {
    passwordEmptyError.style.display = "block";
    passwordInput.style.border = "1px solid #f74747";
  } else if (passwordInput.value.trim().length < 8) {
    passwordInvalidError.style.display = "block";
    passwordInput.style.border = "1px solid #f74747";
  }
}

function validatePasswordConfirmationField() {
  passwordConfirmationError.style.display = "none";
  passwordConfirmationInput.style.border = "none";

  if (
    !passwordConfirmationInput.value.trim() ||
    passwordInput.value.trim() !== passwordConfirmationInput.value.trim()
  ) {
    passwordConfirmationError.style.display = "block";
    passwordConfirmationInput.style.border = "1px solid #f74747";
  }
}
