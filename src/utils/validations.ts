type ValidationType = 'required' | 'email' | 'password'

export const validateField = (value: string, fieldName: string, type: ValidationType): string | undefined => {
    if (type !== 'required' && !value.trim()) {
        return `${fieldName} is required`
    }

    switch (type) {
        case 'required':
            if (value == null || !value.trim()) {
                return `${fieldName} is required`
            }
            break

        case 'email': {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(value)) {
                return 'Invalid email format'
            }
            break
        }

        case 'password':
            if (value.length < 6) {
                return 'Password must be at least 6 characters'
            }
            break

        default:
            throw new Error(`Unsupported validation type: ${type}`)
    }
}

export function validate(fieldName: string, value: any, expectedType: string) {
    if (expectedType === 'string') {
        if (typeof value !== 'string' || value.trim().length === 0) {
            return `${fieldName} should be a non-empty string.`
        }
    } else if (expectedType === 'int') {
        if (typeof value !== 'number' || !Number.isInteger(value)) {
            return `${fieldName} should be an integer.`
        }
    }
    return null // No error
}
