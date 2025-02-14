import { useCalculateStore } from '@/stores/calculate'
import { evaluate } from 'mathjs'

const store = useCalculateStore()

export class Button {
  symbol: string
  type: string
  display: string
  text: boolean

  constructor(S: string, D: string | null, T: string = 'default', text: boolean = false) {
    this.symbol = S
    this.type = T
    if (D) {
      this.display = D
    } else {
      this.display = S
    }

    this.text = text
  }

  Use(): void {}
}

export class Digit extends Button {
  constructor(S: string, D: string | null = null, T: string = 'number', text: boolean = false) {
    super(S, D, T, text)
  }

  override Use() {
    store.Add(this)
  }
}

export class Action extends Button {
  setBraces: boolean
  constructor(
    S: string,
    D: string | null = null,
    T: string = 'action',
    text: boolean = false,
    B: boolean = false,
  ) {
    super(S, D, T, text)
    this.setBraces = B
  }

  override Use() {
    store.Add(this)
    if (this.setBraces) store.Add(new Digit('(', '(', 'number comma', true))
  }
}

export class Delete extends Button {
  constructor(S: string, D: string | null = null, T: string = 'action', text: boolean = false) {
    super(S, D, T, text)
  }

  override Use() {
    store.Remove()
  }
}

export class Clean extends Button {
  constructor(S: string, D: string | null = null, T: string = 'action', text: boolean = false) {
    super(S, D, T, text)
  }

  override Use() {
    store.Clean()
  }
}

export class CalcError extends Button {
  constructor(S: string) {
    super(S, null, 'error', true)
  }
}

export class Equal extends Button {
  constructor(S: string, D: string | null = null, T: string = 'equal', text: boolean = false) {
    super(S, D, T, text)
  }

  override Use() {
    let expression = store.screen.map((a) => a.symbol).join('')

    expression = expression.replace(',', '.')

    console.log(expression)

    if (expression == '') return

    try {
      const evaluated = evaluate(expression)

      if (Object.is(evaluated, Infinity)) {
        store.Clean()
        store.Add(new Digit('Infinity', 'infinity', 'default infinity'))
        return
      }

      const val = evaluated.toString()
      console.log(val)

      store.Clean()

      for (let i = 0; i < val.length; i++) {
        console.log(val.charAt(i))

        if (val[i] == '.') {
          store.Add(new Digit(',', ',', 'number comma', true))
          continue
        }

        store.Add(new Digit(val.charAt(i)))
      }
    } catch (e) {
      store.Clean()
      store.Add(new CalcError(JSON.stringify(e)))
    }
  }
}
