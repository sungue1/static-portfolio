1. nodejs 18이상 설치
2. yarn 설치
```
npm install -g yarn
```
3. 의존파일 가져오기
```
yarn
```
4. src/main.tsx에 prompt.txt를 활용한 소스코드를 복사 붙여넣기 후

5. package.json에 deploy에 버킷명과 AWS profile 설정

6. 배포(과정에서 build는 포함)
```
yarn deploy
```

7. 미리보기
```
yarn dev
```