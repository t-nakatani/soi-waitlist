"use server"

import { z } from "zod"

const schema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function joinWaitlist(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email")

    if (!email) {
      return { success: false, message: "メールアドレスを入力してください" }
    }

    const result = schema.safeParse({ email })

    if (!result.success) {
      return { success: false, message: result.error.errors[0].message }
    }

    // Get the API domain from environment variables
    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || ""

    if (!apiDomain) {
      console.error("API domain environment variable is not set")
      return { success: false, message: "サーバー設定エラーが発生しました。後でもう一度お試しください。" }
    }

    // Make the API call to the waitlist endpoint
    const response = await fetch(`${apiDomain}/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.toString() }),
    })

    if (!response.ok) {
      // Handle 409 status code (already registered) as a positive case
      if (response.status === 409) {
        return {
          success: true,
          message: "このメールアドレスは既に登録されています。ローンチの準備が整い次第ご連絡します！",
          count: 0, // Don't increment the counter for already registered emails
        }
      }

      // Handle 406 status code (waitlist full) as a special case
      if (response.status === 406) {
        return {
          success: true,
          message:
            "現在のウェイトリストは満員です。次の枠が解放されるまでお待ちください。新しい枠が利用可能になり次第お知らせします。",
          count: 0,
          waitlistFull: true,
        }
      }

      // Handle other error cases
      const errorData = await response.json().catch(() => null)
      console.error("Waitlist API error:", response.status, errorData)
      return {
        success: false,
        message: "登録中にエラーが発生しました。後でもう一度お試しください。",
      }
    }

    // Successful registration
    return {
      success: true,
      message: "ウェイトリストに追加されました。ローンチ時にお知らせします。",
      count: 1, // Increment by 1 for the UI counter
    }
  } catch (error) {
    console.error("Error in joinWaitlist:", error)
    return {
      success: false,
      message: "予期せぬエラーが発生しました。後でもう一度お試しください。",
    }
  }
}

export async function getWaitlistSize() {
  try {
    const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || ""

    if (!apiDomain) {
      console.error("API domain environment variable is not set")
      return { size: 0, isFull: false }
    }

    const response = await fetch(`${apiDomain}/waitlist/size`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Don't cache this request
    })

    if (!response.ok) {
      console.error("Error fetching waitlist size:", response.status)
      return { size: 0, isFull: false }
    }

    const data = await response.json()
    return {
      size: data.size || 0,
      isFull: data.is_full || false,
    }
  } catch (error) {
    console.error("Error in getWaitlistSize:", error)
    return { size: 0, isFull: false }
  }
}

