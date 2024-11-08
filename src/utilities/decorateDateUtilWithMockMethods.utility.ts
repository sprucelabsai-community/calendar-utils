import { assert } from '@sprucelabs/test-utils'
import { cloneDeep } from 'lodash'
import { DateUtil } from '../types/calendar.types'

export default function decorateDateUtilWithMockMethods(dateUtil: DateUtil) {
    const mockDateUtil = cloneDeep(dateUtil)

    //@ts-ignore
    Object.keys(mockDateUtil).filter((methodName: keyof DateUtil) => {
        if (typeof mockDateUtil[methodName] === 'function') {
            const assertionName = `assert${methodName.charAt(0).toUpperCase()}${methodName.slice(
                1
            )}Called`

            const callLog: Record<string, any> = {}
            const originalMethod = mockDateUtil[methodName].bind(mockDateUtil)

            //@ts-ignore
            mockDateUtil[methodName] = (...args) => {
                callLog[methodName] = args
                //@ts-ignore
                return originalMethod(...args)
            }

            //@ts-ignore
            mockDateUtil[assertionName] = (...args: any[]) => {
                assert.isTruthy(
                    callLog[methodName],
                    `dateUtil.${methodName} was not called`
                )

                if (args.length > 0) {
                    assert.isEqualDeep(callLog[methodName], args, 'expected')
                }
            }
        }
    }) as (keyof DateUtil)[]

    return mockDateUtil as MockDateUtil<DateUtil>
}

export type MockDateUtil<T = DateUtil> = {
    [K in keyof T]: T[K]
} & {
    [K in keyof T as `assert${Capitalize<string & K>}Called`]: T[K]
}
