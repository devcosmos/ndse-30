# Инициализация TS 

```
npm i -D typescript
npx tsc --init
```

# Инициализация ESLint

```
npm i -D eslint
npm i -D @typescript-eslint/parser
npm i -D @typescript-eslint/eslint-plugin
eslint --init
```


# Scripts Example

"build": "tsc --project ./tsconfig.json --watch",
"eslint": "eslint --cache --ext .js,.jsx,.ts,.tsx src",
"eslint:dump": "eslint --print-config ./.eslintrc.json",