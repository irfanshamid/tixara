import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
      const today = new Date();

      // End date = hari ini (format YYYY-MM-DD)
      const endDate = today.toISOString().split("T")[0];

      // Start date = 6 hari sebelum hari ini
      const startObj = new Date();
      startObj.setDate(today.getDate() - 7);
      const startDate = startObj.toISOString().split("T")[0];

      const payload = {
        request: {
            time_descriptor: {
                granularity: '7D',
                end: endDate,
                start: startDate,
                with_previous_period: false,
                scenario: 4,
                timezone_offset: 25200
            }
        }
      };

      const response = await fetch(
        "https://seller-id.tokopedia.com/api/v2/insights/seller/live/performance/creator/list?locale=en&language=en&oec_seller_id=7494930113907558878&seller_id=7494930113907558878&aid=4068&app_name=i18n_ecom_shop&fp=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=en-US&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010_15_7%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F142.0.0.0%20Safari%2F537.36&browser_online=true&timezone_name=Asia%2FJakarta&use_content_type_definition=1&msToken=RgLJENV2xIL9x9RU6-nvtQDaJ_b_4YdvfKGk-SS3PjvgZ-vijZwvucB3755yQ7UWziKcFzjY_h8o0L3AWuMR8Q8Ub8JmqLhLd5pMpYhdQr6tmHeiCGN1m-4Th3k5ozlYBLIRxsQg&X-Bogus=DFSzswjY2Q8nwLVOCOYlLAnUrdXk&X-Gnarly=MRnPkBkCiNtLK2l8A9LP0-Q2iUmPj/K5E9YrEM1Nu/rXLrVzalg5gVVDJhGBlYhEBetAGPkSBMulgCpjUGGy8RfXXPd9xeZVjWwB/BP2wjrxNqc1Oh4uifWJ2Dr8vmz3ypthDqjW4SqdnbmfSGYmRlH/5iN2gqHPADSs6Lv8sQh5zLLnKakZkDmEbTZutU7pJoziGYjMZote8P/ZGMMJhW7vUja9PGFrsBADIkSOhphJ3zoZvr7/yKWrhRMoGQbjmeBXZX3y4EHQ",
        {
          method: "POST",
          headers: {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "Cookie": "_UUID_NONLOGIN_=e20faff7f58f8f10280674a029fd1893; _UUID_NONLOGIN_.sig=cMtdpZx2XRPS7rFC-bdjj_UVvmE; DID=a8e0bd4eb23794d9be2564131b58730856a78d4fbe25f1780ded9e957b77d6f0498bd0b7312412f9c6971b88010c4de9; DID_JS=YThlMGJkNGViMjM3OTRkOWJlMjU2NDEzMWI1ODczMDg1NmE3OGQ0ZmJlMjVmMTc4MGRlZDllOTU3Yjc3ZDZmMDQ5OGJkMGI3MzEyNDEyZjljNjk3MWI4ODAxMGM0ZGU547DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _tt_enable_cookie=1; _ttp=01JXF1B7Z00TKR6HXYBSVJ2TB7_.tt.1; hfv_banner=true; _gcl_au=1.1.721021949.1760415321; _fbp=fb.1.1760415718214.238844213228639297; _SID_Tokopedia_=QtKvQu2rBRNIcphbSZ3XibGO0TNhHsbNe9oQWPDGRAxvHtqrQXdoRaFTdE4tsWFgNo1JFFigFzeiKI3uL5N7BixHS4fr9LDux0ngvzQEISgUrL0a8wzpOq4V8e7l1QNp; tuid=10836217; gec_id=46541197627375296; _CASE_=227b38103d7b637b6b68686968686d6a6e7b757b3a103d7b63686e68757b3d103d7b636c6f6a6b757b350c293d7b637b7b757b35382d7b637b746f776d686f6e6a6b6e616169616c606b606c7b757b353b357b637b0b2c34383179102b3f38377b757b3536373e7b637b68696f77616f6a6b6d6061606e6869696f7b757b291a367b637b686f6d6c687b757b2a103d7b637b697b757b2a0d20293c7b637b7b757b2e103d7b637b697b757b2e312a2a7b637b02047b24; _UUID_CAS_=c0495af8-9c6a-47a4-8172-c7efd8c895bd; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8e8a93f43611847b0ae440da48c36985.1751530474580.1751530474580.1760465180736.10%22%7D; ttcsid_CPTR1KRC77UF05LN2NAG=1760892209071::dvYVW53O5B6Iv12aZy9_.6.1760892653131.0; _ga_70947XW48P=GS2.1.s1760892207$o8$g1$t1760892839$j60$l0$h0; _m4b_theme_=new; s_v_web_id=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn; tt_ticket_guard_client_web_domain=2; passport_csrf_token=3b0d06a6020456ecd9e424c26fbbe3d3; passport_csrf_token_default=3b0d06a6020456ecd9e424c26fbbe3d3; _ga=GA1.1.1191974235.1749630163; sso_auth_status=60c5571fb597afb325e8743ea343fb58; sso_auth_status_ss=60c5571fb597afb325e8743ea343fb58; i18next=en; gs_seller_type_for_report=pop; goofy_grayscale_uid=d29e92b34ae0e7ef2f5b099ce8a9e98e; test_flag=0; _tt_ticket_crypt_doamin=2; ATLAS_LANG=en; pre_country=ID; lang_type=en; passport_fe_beating_status=true; gd_random=eyJtYXRjaCI6dHJ1ZSwicGVyY2VudCI6MC4wMjU2MzUyNjM4MzQyNzU3MjN9.UnvipDNXQpppRdfdQ4uc9jlM+qayAx+/wt1Bg3np9rU=; _abck=5C8EB99A49DEC2DE44F9F5ABAC634C37~-1~YAAQDfAWArWbq5iaAQAAQPU4mg6Bz+WxXP8AI4/ZzAXGgCCaZA5Ml7z3ygBrIxW1dE8V6bPemFIEwhJWTgyIp1rergkkeFPH8nZCtpsCv7zLza5gYhEWQ8ORLA/N7A9kG5oz8dHLaEr920zduiI4G3KQQkmSgQbfQDx1MpJh9B7dAx1EJNtIgq0UXu4sot3EhnaCPNmx83WDnQ0A7NTQxc9s0VI+PSHPETizgalxO1pHLOPR4hbDkJNklGXOE8ldRtFIpkKaST/V4m4sjnYFvQCrVAxY4AZ3aLufqelRNMkwMalGezdYP8K7TZFMlpuiKDXfHidQhsb3GU17TDfH/ASPYZjdCynCR4hJrFfAkz/JZ4ON9EwxHgUC6LqXSp6LjL35fKL5YDCiBpdN9QxGzuSCLvMQBcuHs10ej9QnMZe9v1B62loUzrAvhLC+GZmA8V5cd+HbfPWH3gwMYrbAtbYepPtrql16pg2lY8otz7SaM7uVlFmyRPBT2wm3rCRs82D300uAa8+ILQssVILC0HM0G8imgFVmK7dHMraSy/Is4nAf7Gem4S7l83uR0t/G1P8wSAEGM2YgV64AtBtK7YI+SSP5uraMozIofnCtQdI5UEvwhKckpd+rcA8SdOlarmKONE1gWVvVhNpOOzN8aeizU8yCi+xJ3BkaNlwxPKXz2s9rZwhALqXcNDZnYR0meptO+ULF1RTqHJS5GaPtNOzOwCrqMreslW5eaDpDQbDAyWIbrkJrTbE2TYkcBpsUQ1LK/53ezpt/uz52MhTNwYtu2qxmBcz46ca0rZjyxZqkz5ajR+Y6/LkqV6j7zRl7BX13EcxMYjrAL2CkluV+kHDtpDRj1Yoyn37VNefYaN5Oyqav2opyfciJ3OBOKhTPsNKKBnrrig==~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f1EGENBYAtP8NxfFv+%2f4kGlvnWgO1l639RMBDAa7xXDsz0%2famLKWmh+xi76cdp9FQdMZIghT7fVTvxcwapKR3frVfRJPyRCkr12T~-1; tt_ticket_guard_client_data=eyJ0dC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwidHQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJ0dC10aWNrZXQtZ3VhcmQtc2NlbmUiOiJ0dF9zZWxsZXIiLCJ0dC10aWNrZXQtZ3VhcmQtb3JpZ2luLWNyeXB0Ijoie1wiZWNfcHJpdmF0ZUtleVwiOlwiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXFxuTUlHSEFnRUFNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQkcwd2F3SUJBUVFnWmxlaXVRS2Yxd0FjOGtCM1VmSE50SUFlb280VzRmdTFxbzJEZVl4Z3JaT2hSQU5DQUFTYWZPdkNRd3M0NkpYcml6VFh1bGQ0WDFzRklnSGJ4Z3ZnSGhTaElUVHovQ1EzaHVyVytoQS9IbTA3VXllQUoxcGNDWmVXeWFwTndMOFozVndoMnNUclxcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cIixcImVjX3B1YmxpY0tleVwiOlwiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cXG5NRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVtbnpyd2tNTE9PaVY2NHMwMTdwWGVGOWJCU0lCMjhZTDRCNFVvU0UwOC93a040YnExdm9RUHg1dE8xTW5nQ2RhWEFtWGxzbXFUY0MvR2QxY0lkckU2dz09XFxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXCIsXCJlY19jc3JcIjpcIlwifSIsInR0LXRpY2tldC1ndWFyZC1wdWJsaWMta2V5IjoiQkpwODY4SkRDempvbGV1TE5OZTZWM2hmV3dVaUFkdkdDK0FlRktFaE5QUDhKRGVHNnRiNkVEOGViVHRUSjRBbldsd0psNWJKcWszQXZ4bmRYQ0hheE9zPSIsInR0LXRpY2tldC1ndWFyZC13ZWItdmVyc2lvbiI6MX0%3D; d_ticket=449def365b757bd9ad420bf0a50bfcf9526bf; ttcsid=1763524045944::XMz0mT0IazaiRvvNjLZ_.11.1763524176815.0; ttcsid_CMSS13RC77U1PJEFQUB0=1763524045941::PtAJuegJdQ2ZOtVwBOEj.5.1763524176815.0; sso_uid_tt=334c3d4c043219a543d9ac79f42f30e981d4f18a42460cd4d07f238fd5595baa; sso_uid_tt_ss=334c3d4c043219a543d9ac79f42f30e981d4f18a42460cd4d07f238fd5595baa; toutiao_sso_user=33b22b8629437bb27355769ffe3c19b8; toutiao_sso_user_ss=33b22b8629437bb27355769ffe3c19b8; sid_ucp_sso_v1=1.0.1-KDg2YWIxYzZjM2VkODIwMDU1ZTg2OTQzZjliMzI0MTY4MDYxMzdjYzkKIgiHiMuAgtf8kmcQ0vz0yAYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiAzM2IyMmI4NjI5NDM3YmIyNzM1NTc2OWZmZTNjMTliODJOCiBfDsLNVuJW5TLD5IjcVCs11VXoJLBpUB5LbmsJfNIFyxIg6T5VRIcgreQv_d5Cdj_y9q2beiQZINYvTaI1rnbcpBkYAiIGdGlrdG9r; ssid_ucp_sso_v1=1.0.1-KDg2YWIxYzZjM2VkODIwMDU1ZTg2OTQzZjliMzI0MTY4MDYxMzdjYzkKIgiHiMuAgtf8kmcQ0vz0yAYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiAzM2IyMmI4NjI5NDM3YmIyNzM1NTc2OWZmZTNjMTliODJOCiBfDsLNVuJW5TLD5IjcVCs11VXoJLBpUB5LbmsJfNIFyxIg6T5VRIcgreQv_d5Cdj_y9q2beiQZINYvTaI1rnbcpBkYAiIGdGlrdG9r; _ga_BZBQ2QHQSP=GS2.1.s1763524046$o7$g1$t1763524178$j60$l0$h1680843195; sid_guard=5f5fdce8f48697cd0ef1e410aba29018%7C1763524179%7C259200%7CSat%2C+22-Nov-2025+03%3A49%3A39+GMT; uid_tt=297565f793b6acc76558c20509f7b1d33bf8af165cc54d072c920e310e4af53a; uid_tt_ss=297565f793b6acc76558c20509f7b1d33bf8af165cc54d072c920e310e4af53a; sid_tt=5f5fdce8f48697cd0ef1e410aba29018; sessionid=5f5fdce8f48697cd0ef1e410aba29018; sessionid_ss=5f5fdce8f48697cd0ef1e410aba29018; tt_session_tlb_tag=sttt%7C2%7CX1_c6PSGl80O8eQQq6KQGP_________wSary4I_nuvXMAa4fFhbc7bZLeO_zMtWZ8rMpcg31yTU%3D; sid_ucp_v1=1.0.1-KDhiZTM0Mzc4OTAwNDNhNTZhYTEwMGE3MDQ3MzVmOTFkZGE3NzhkYzkKHAiHiMuAgtf8kmcQ0_z0yAYY5B8gDDgBQOsHSAQQAxoDbXkyIiA1ZjVmZGNlOGY0ODY5N2NkMGVmMWU0MTBhYmEyOTAxODJOCiA7qKLEqoBjq_qHyiH430n_D3ebxxoKnQcleXryOuV95RIgL8Hs1goKwSWY69qHi1sPfij5bADoHahNWvdWbkq1hNQYBSIGdGlrdG9r; ssid_ucp_v1=1.0.1-KDhiZTM0Mzc4OTAwNDNhNTZhYTEwMGE3MDQ3MzVmOTFkZGE3NzhkYzkKHAiHiMuAgtf8kmcQ0_z0yAYY5B8gDDgBQOsHSAQQAxoDbXkyIiA1ZjVmZGNlOGY0ODY5N2NkMGVmMWU0MTBhYmEyOTAxODJOCiA7qKLEqoBjq_qHyiH430n_D3ebxxoKnQcleXryOuV95RIgL8Hs1goKwSWY69qHi1sPfij5bADoHahNWvdWbkq1hNQYBSIGdGlrdG9r; msToken=HijKCuEeHAB6QI2FaRNShoH7u6uh-_NMc8vW3hWX6XH0Bl3yRC6x_StNAWd-3ThGfSsGTBbdB5L4dtdhpEiRaL9L1eNX5or8lu-lr6ufKHKeatJnLQSxEOZbT1JKuA==; global_seller_id_unified_seller_env=7494930113907558878; app_id_unified_seller_env=4068; oec_seller_id_unified_seller_env=7494930113907558878; SELLER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjc0MzI2MTM2MzI2NzA4NzY2NzksIk9lY1VpZCI6NzQ5NTk3OTY5NDUzOTU3Mzk0NCwiT2VjU2hvcElkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJTaG9wUmVnaW9uIjoiIiwiR2xvYmFsU2VsbGVySWQiOjc0OTQ5MzAxMTM5MDc1NTg4NzgsIlNlbGxlcklkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJleHAiOjE3NjM3MTU2OTAsIm5iZiI6MTc2MzYyODI5MH0.RUjuWaYYOqAjZU_cL1OSKhXKtiiil3q4gqUrQSyuhyQ; ttwid=1%7CDmzLYDAMXkwdyXc7CqNnNDRg7BhO108hrXcl57YhkHo%7C1763630048%7C74de1f2bce620d23c1fcfc45449953587493fc5e4055679b2ee26fe874d767c4; _dd_s=logs=1&id=247d2a80-f6a3-4167-b4c4-4a45d2b4e225&created=1763628896781&expire=1763630949600; msToken=RgLJENV2xIL9x9RU6-nvtQDaJ_b_4YdvfKGk-SS3PjvgZ-vijZwvucB3755yQ7UWziKcFzjY_h8o0L3AWuMR8Q8Ub8JmqLhLd5pMpYhdQr6tmHeiCGN1m-4Th3k5ozlYBLIRxsQg; user_oec_info=0a53d4c0bf04f7a15002344dc3c1fd80c8563385e366375cf763b9002bf738b448a9f56409e6a0e01bed6360a83502710e449581dcb9ab0300f4ef62580bfcaef3d7fed37f65f920377ce5951f9ba5cd82863d13161a490a3c000000000000000000004fbc280c6aee91f5c085394ff9ff048790fbc3117449d51755366d7560206b8434710aa0a63bd6dd0d6dd5da301ba1937c38108486820e1886d2f6f20d2201043d56324b; odin_tt=e234a0566c9740b0371b1b3fe6072f23917fba7258ad9719f53f42f2fa49ed713475959e3fe2b465a31be91bba728e8ba737d763f4d52faa6186ed2de96c073f",
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      console.log('data', data);

      // Save ke Prisma
      const rooms = data?.data?.stats ?? [];

      for (const item of rooms) {
        const liveId = item?.live_meta?.id;
        if (!liveId) {
          console.warn("SKIPPED: no live_meta.id for item:", item);
          continue;
        }

        try {
          await prisma.roomStats.upsert({
            where: { roomId: String(liveId) },
            update: {
              username: item.creator_meta?.handle ?? "",
              displayName: item.creator_meta?.display_name ?? null,
              stats: item,
            },
            create: {
              id: crypto.randomUUID(),
              roomId: String(liveId),
              username: item.creator_meta?.handle ?? "",
              displayName: item.creator_meta?.display_name ?? null,
              stats: item,
            },
          });

        } catch (err) {
          console.error("UPSERT ERROR:", err);
        }
      }



    return NextResponse.json({
      success: true,
      message: "Cron room has been success",
    });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
