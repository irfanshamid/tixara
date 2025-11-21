import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getJakartaTime } from "@/utils/helper";
import { CreatorPerformance } from "@/types/performance";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const MAX_PAGE = 60;

    const allPerformance: CreatorPerformance[] = [];

    for (let page = 1; page <= MAX_PAGE; page++) {
      const payload = `{"params":{"detail_list_type":1,"creator_list_params":[{"time_descriptor":{"granularity_type":1,"timezone_offset":25200,"start_time":1762966800,"end_time":1763571600},"metric_types":[2,3,5,6,7,10,11,8,9,4,12],"page_param":{"page_no":${page},"page_size":50},"sorter":{"sort_type":2,"order_type":1},"filter":{}}]}}`;

      const response = await fetch(
        "https://affiliate-id.tokopedia.com/api/v1/oec/affiliate/compass/transaction/detail_list/get?user_language=en&aid=4331&app_name=i18n_ecom_alliance&device_id=0&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=en-US&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F142.0.0.0+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FJakarta&oec_seller_id=7494930113907558878&shop_region=ID&msToken=_xK_dzxGY5BjrW7228an5-Aib7aSWa1NZEEs4MYGpRoT1dgyCtwQ8CjCtRchYR7k-Piz05Dfq2pui7Xc0HsQeHDqMHad14TIs7m_6AlkuWv6Wr3k4vDdIs0Ujmx9JOpOtUOT6qA=&X-Bogus=DFSzswVL0Y8Y1Vc8COu7d/nUrd1J&X-Gnarly=Mc/0AdvBMCYDC892A2wrMp0tSqlaag-CZNWOnlPI-GwkqJCklT1o46fCe4Mlnlqtd34BzYZoftXsgtsz4zcmBXtgjR8F7/9Oh-nmuPDc63rj/idHd1-dQLZjKdDADUPpywDNRZ/jv3gE7f/gCpV4IRkvZ7bP1UqpoaQoGtMuT5E/se/fWhqKhV63i9TVZrecY2oeJqtgZSIHU9L66GeOGqvs3bCkJrDsnxpZhgCDkiGYWWjmreQl/ZqjqvVlZZMOG1E6HfGhdxhD",
        {
          method: "POST",
          headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "content-type": "application/json",
            "origin": "https://affiliate-id.tokopedia.com",
            "referer": "https://affiliate-id.tokopedia.com/insights/transaction-analysis?shop_region=ID",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
            "Cookie": "_UUID_NONLOGIN_=e20faff7f58f8f10280674a029fd1893; _UUID_NONLOGIN_.sig=cMtdpZx2XRPS7rFC-bdjj_UVvmE; DID=a8e0bd4eb23794d9be2564131b58730856a78d4fbe25f1780ded9e957b77d6f0498bd0b7312412f9c6971b88010c4de9; DID_JS=YThlMGJkNGViMjM3OTRkOWJlMjU2NDEzMWI1ODczMDg1NmE3OGQ0ZmJlMjVmMTc4MGRlZDllOTU3Yjc3ZDZmMDQ5OGJkMGI3MzEyNDEyZjljNjk3MWI4ODAxMGM0ZGU547DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _tt_enable_cookie=1; _ttp=01JXF1B7Z00TKR6HXYBSVJ2TB7_.tt.1; hfv_banner=true; _gcl_au=1.1.721021949.1760415321; _fbp=fb.1.1760415718214.238844213228639297; _SID_Tokopedia_=QtKvQu2rBRNIcphbSZ3XibGO0TNhHsbNe9oQWPDGRAxvHtqrQXdoRaFTdE4tsWFgNo1JFFigFzeiKI3uL5N7BixHS4fr9LDux0ngvzQEISgUrL0a8wzpOq4V8e7l1QNp; tuid=10836217; gec_id=46541197627375296; _CASE_=227b38103d7b637b6b68686968686d6a6e7b757b3a103d7b63686e68757b3d103d7b636c6f6a6b757b350c293d7b637b7b757b35382d7b637b746f776d686f6e6a6b6e616169616c606b606c7b757b353b357b637b0b2c34383179102b3f38377b757b3536373e7b637b68696f77616f6a6b6d6061606e6869696f7b757b291a367b637b686f6d6c687b757b2a103d7b637b697b757b2a0d20293c7b637b7b757b2e103d7b637b697b757b2e312a2a7b637b02047b24; _UUID_CAS_=c0495af8-9c6a-47a4-8172-c7efd8c895bd; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8e8a93f43611847b0ae440da48c36985.1751530474580.1751530474580.1760465180736.10%22%7D; ttcsid_CPTR1KRC77UF05LN2NAG=1760892209071::dvYVW53O5B6Iv12aZy9_.6.1760892653131.0; _ga_70947XW48P=GS2.1.s1760892207$o8$g1$t1760892839$j60$l0$h0; _m4b_theme_=new; tt_ticket_guard_client_web_domain=2; passport_csrf_token=3b0d06a6020456ecd9e424c26fbbe3d3; passport_csrf_token_default=3b0d06a6020456ecd9e424c26fbbe3d3; _ga=GA1.1.1191974235.1749630163; sso_auth_status=60c5571fb597afb325e8743ea343fb58; sso_auth_status_ss=60c5571fb597afb325e8743ea343fb58; _tt_ticket_crypt_doamin=2; i18next=en; _abck=5C8EB99A49DEC2DE44F9F5ABAC634C37~-1~YAAQDfAWArWbq5iaAQAAQPU4mg6Bz+WxXP8AI4/ZzAXGgCCaZA5Ml7z3ygBrIxW1dE8V6bPemFIEwhJWTgyIp1rergkkeFPH8nZCtpsCv7zLza5gYhEWQ8ORLA/N7A9kG5oz8dHLaEr920zduiI4G3KQQkmSgQbfQDx1MpJh9B7dAx1EJNtIgq0UXu4sot3EhnaCPNmx83WDnQ0A7NTQxc9s0VI+PSHPETizgalxO1pHLOPR4hbDkJNklGXOE8ldRtFIpkKaST/V4m4sjnYFvQCrVAxY4AZ3aLufqelRNMkwMalGezdYP8K7TZFMlpuiKDXfHidQhsb3GU17TDfH/ASPYZjdCynCR4hJrFfAkz/JZ4ON9EwxHgUC6LqXSp6LjL35fKL5YDCiBpdN9QxGzuSCLvMQBcuHs10ej9QnMZe9v1B62loUzrAvhLC+GZmA8V5cd+HbfPWH3gwMYrbAtbYepPtrql16pg2lY8otz7SaM7uVlFmyRPBT2wm3rCRs82D300uAa8+ILQssVILC0HM0G8imgFVmK7dHMraSy/Is4nAf7Gem4S7l83uR0t/G1P8wSAEGM2YgV64AtBtK7YI+SSP5uraMozIofnCtQdI5UEvwhKckpd+rcA8SdOlarmKONE1gWVvVhNpOOzN8aeizU8yCi+xJ3BkaNlwxPKXz2s9rZwhALqXcNDZnYR0meptO+ULF1RTqHJS5GaPtNOzOwCrqMreslW5eaDpDQbDAyWIbrkJrTbE2TYkcBpsUQ1LK/53ezpt/uz52MhTNwYtu2qxmBcz46ca0rZjyxZqkz5ajR+Y6/LkqV6j7zRl7BX13EcxMYjrAL2CkluV+kHDtpDRj1Yoyn37VNefYaN5Oyqav2opyfciJ3OBOKhTPsNKKBnrrig==~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f1EGENBYAtP8NxfFv+%2f4kGlvnWgO1l639RMBDAa7xXDsz0%2famLKWmh+xi76cdp9FQdMZIghT7fVTvxcwapKR3frVfRJPyRCkr12T~-1; tt_ticket_guard_client_data=eyJ0dC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwidHQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJ0dC10aWNrZXQtZ3VhcmQtc2NlbmUiOiJ0dF9zZWxsZXIiLCJ0dC10aWNrZXQtZ3VhcmQtb3JpZ2luLWNyeXB0Ijoie1wiZWNfcHJpdmF0ZUtleVwiOlwiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXFxuTUlHSEFnRUFNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQkcwd2F3SUJBUVFnWmxlaXVRS2Yxd0FjOGtCM1VmSE50SUFlb280VzRmdTFxbzJEZVl4Z3JaT2hSQU5DQUFTYWZPdkNRd3M0NkpYcml6VFh1bGQ0WDFzRklnSGJ4Z3ZnSGhTaElUVHovQ1EzaHVyVytoQS9IbTA3VXllQUoxcGNDWmVXeWFwTndMOFozVndoMnNUclxcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cIixcImVjX3B1YmxpY0tleVwiOlwiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cXG5NRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVtbnpyd2tNTE9PaVY2NHMwMTdwWGVGOWJCU0lCMjhZTDRCNFVvU0UwOC93a040YnExdm9RUHg1dE8xTW5nQ2RhWEFtWGxzbXFUY0MvR2QxY0lkckU2dz09XFxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXCIsXCJlY19jc3JcIjpcIlwifSIsInR0LXRpY2tldC1ndWFyZC1wdWJsaWMta2V5IjoiQkpwODY4SkRDempvbGV1TE5OZTZWM2hmV3dVaUFkdkdDK0FlRktFaE5QUDhKRGVHNnRiNkVEOGViVHRUSjRBbldsd0psNWJKcWszQXZ4bmRYQ0hheE9zPSIsInR0LXRpY2tldC1ndWFyZC13ZWItdmVyc2lvbiI6MX0%3D; d_ticket=449def365b757bd9ad420bf0a50bfcf9526bf; ttcsid=1763524045944::XMz0mT0IazaiRvvNjLZ_.11.1763524176815.0; ttcsid_CMSS13RC77U1PJEFQUB0=1763524045941::PtAJuegJdQ2ZOtVwBOEj.5.1763524176815.0; sso_uid_tt=334c3d4c043219a543d9ac79f42f30e981d4f18a42460cd4d07f238fd5595baa; sso_uid_tt_ss=334c3d4c043219a543d9ac79f42f30e981d4f18a42460cd4d07f238fd5595baa; toutiao_sso_user=33b22b8629437bb27355769ffe3c19b8; toutiao_sso_user_ss=33b22b8629437bb27355769ffe3c19b8; sid_ucp_sso_v1=1.0.1-KDg2YWIxYzZjM2VkODIwMDU1ZTg2OTQzZjliMzI0MTY4MDYxMzdjYzkKIgiHiMuAgtf8kmcQ0vz0yAYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiAzM2IyMmI4NjI5NDM3YmIyNzM1NTc2OWZmZTNjMTliODJOCiBfDsLNVuJW5TLD5IjcVCs11VXoJLBpUB5LbmsJfNIFyxIg6T5VRIcgreQv_d5Cdj_y9q2beiQZINYvTaI1rnbcpBkYAiIGdGlrdG9r; ssid_ucp_sso_v1=1.0.1-KDg2YWIxYzZjM2VkODIwMDU1ZTg2OTQzZjliMzI0MTY4MDYxMzdjYzkKIgiHiMuAgtf8kmcQ0vz0yAYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiAzM2IyMmI4NjI5NDM3YmIyNzM1NTc2OWZmZTNjMTliODJOCiBfDsLNVuJW5TLD5IjcVCs11VXoJLBpUB5LbmsJfNIFyxIg6T5VRIcgreQv_d5Cdj_y9q2beiQZINYvTaI1rnbcpBkYAiIGdGlrdG9r; _ga_BZBQ2QHQSP=GS2.1.s1763524046$o7$g1$t1763524178$j60$l0$h1680843195; sid_guard=5f5fdce8f48697cd0ef1e410aba29018%7C1763524179%7C259200%7CSat%2C+22-Nov-2025+03%3A49%3A39+GMT; uid_tt=297565f793b6acc76558c20509f7b1d33bf8af165cc54d072c920e310e4af53a; uid_tt_ss=297565f793b6acc76558c20509f7b1d33bf8af165cc54d072c920e310e4af53a; sid_tt=5f5fdce8f48697cd0ef1e410aba29018; sessionid=5f5fdce8f48697cd0ef1e410aba29018; sessionid_ss=5f5fdce8f48697cd0ef1e410aba29018; tt_session_tlb_tag=sttt%7C2%7CX1_c6PSGl80O8eQQq6KQGP_________wSary4I_nuvXMAa4fFhbc7bZLeO_zMtWZ8rMpcg31yTU%3D; sid_ucp_v1=1.0.1-KDhiZTM0Mzc4OTAwNDNhNTZhYTEwMGE3MDQ3MzVmOTFkZGE3NzhkYzkKHAiHiMuAgtf8kmcQ0_z0yAYY5B8gDDgBQOsHSAQQAxoDbXkyIiA1ZjVmZGNlOGY0ODY5N2NkMGVmMWU0MTBhYmEyOTAxODJOCiA7qKLEqoBjq_qHyiH430n_D3ebxxoKnQcleXryOuV95RIgL8Hs1goKwSWY69qHi1sPfij5bADoHahNWvdWbkq1hNQYBSIGdGlrdG9r; ssid_ucp_v1=1.0.1-KDhiZTM0Mzc4OTAwNDNhNTZhYTEwMGE3MDQ3MzVmOTFkZGE3NzhkYzkKHAiHiMuAgtf8kmcQ0_z0yAYY5B8gDDgBQOsHSAQQAxoDbXkyIiA1ZjVmZGNlOGY0ODY5N2NkMGVmMWU0MTBhYmEyOTAxODJOCiA7qKLEqoBjq_qHyiH430n_D3ebxxoKnQcleXryOuV95RIgL8Hs1goKwSWY69qHi1sPfij5bADoHahNWvdWbkq1hNQYBSIGdGlrdG9r; msToken=HijKCuEeHAB6QI2FaRNShoH7u6uh-_NMc8vW3hWX6XH0Bl3yRC6x_StNAWd-3ThGfSsGTBbdB5L4dtdhpEiRaL9L1eNX5or8lu-lr6ufKHKeatJnLQSxEOZbT1JKuA==; global_seller_id_unified_seller_env=7494930113907558878; app_id_unified_seller_env=4068; oec_seller_id_unified_seller_env=7494930113907558878; SELLER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjc0MzI2MTM2MzI2NzA4NzY2NzksIk9lY1VpZCI6NzQ5NTk3OTY5NDUzOTU3Mzk0NCwiT2VjU2hvcElkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJTaG9wUmVnaW9uIjoiIiwiR2xvYmFsU2VsbGVySWQiOjc0OTQ5MzAxMTM5MDc1NTg4NzgsIlNlbGxlcklkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJleHAiOjE3NjM3MTU2OTAsIm5iZiI6MTc2MzYyODI5MH0.RUjuWaYYOqAjZU_cL1OSKhXKtiiil3q4gqUrQSyuhyQ; ttwid=1%7CDmzLYDAMXkwdyXc7CqNnNDRg7BhO108hrXcl57YhkHo%7C1763688938%7C146c26efba2e99c9e0db3f34929a701c3fe5549f080f9b9b58a6cc22a74d1ebb; odin_tt=966efd39fcb75f7d0ecb21f8cd82340b9d2c0a166946af794c3038313d6d299bd14d24a8d9b31a66b6d85c1c87dca25f; msToken=eZEX-CBVGWlnJYrBAXmyJeiKtAnNZodQqa72pkzhPzLPoa4Udz8MeQH-eiWWuHQdzkwsCSUuEhuWXzOrBlsloHwJB2M8qMmzzaU6B1b35b8RqKiYYfLTYe_a9yNt2ryYh-P2zXk=; _dd_s=logs=1&id=0c0cecbb-d720-4beb-a1a4-e34be8a10eb7&created=1763693617337&expire=1763694599202",
            "priority": "u=1, i",
            "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
          },

          body: payload
        }
      );

      const json = await response.json();

      const list = json?.data?.creator_list?.[0]?.list_create_performance ?? [];

      if (list.length === 0) break; // kalau sudah tidak ada data, stop pagination

      allPerformance.push(...list);
    }

    // Remove duplicate by id
    const map = new Map();
    for (const item of allPerformance) {
      map.set(item.creator_base.nick_name, item); // `id` harus field unique dari create_performance
    }

    const finalUniqueList = Array.from(map.values());

    // Save result to DB
    await prisma.affiliate.create({
      data: {
        id: crypto.randomUUID(),
        syncTime: getJakartaTime(),
        stats: finalUniqueList
      }
    });

    return NextResponse.json({
      success: true,
      total: finalUniqueList.length
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
