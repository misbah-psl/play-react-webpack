@IF EXIST "%~dp0\node.exe" (
	echo "found node.exe"
  "%~dp0\node.exe"  "%~dp0\node_modules\webpack\bin\webpack.js" %*
) ELSE (
echo "not found node.exe"
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  echo %PATHEXT%
  node  "%~dp0\node_modules\webpack\bin\webpack.js" %*
)