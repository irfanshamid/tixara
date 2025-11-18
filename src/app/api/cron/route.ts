import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const ROOM_IDS = [
  "7572438844390968076",
  "7571036699610893067",
  "7572472780560157451",
];

export async function GET() {
  try {
    for (const roomId of ROOM_IDS) {
      const payload = {
        request: {
          room_filter: {
            room_id: roomId,
            is_content_type: 1,
            shop_id: "7494930113907558878",
            country: "ID",
          },
          sorting_type: 1,
          stats_types: [
            1, 2, 3, 4, 5, 6, 51, 350, 64, 7, 10, 15, 341, 120, 30, 342,
          ],
        },
      };

      const response = await fetch(
        "https://seller-id.tokopedia.com/api/v1/insights/workbench/live/detail/product/list?app_name=i18n_ecom_shop&device_id=0&fp=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=en-US&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F142.0.0.0+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FJakarta&vertical=2&oec_seller_id=7494930113907558878",
        {
          method: "POST",
          headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,id;q=0.8",
            "content-type": "application/json",
            "origin": "https://seller-id.tokopedia.com",
            "referer": "https://seller-id.tokopedia.com/workbench/live/overview...",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
            "Cookie": '_UUID_NONLOGIN_=e20faff7f58f8f10280674a029fd1893; _UUID_NONLOGIN_.sig=cMtdpZx2XRPS7rFC-bdjj_UVvmE; DID=a8e0bd4eb23794d9be2564131b58730856a78d4fbe25f1780ded9e957b77d6f0498bd0b7312412f9c6971b88010c4de9; DID_JS=YThlMGJkNGViMjM3OTRkOWJlMjU2NDEzMWI1ODczMDg1NmE3OGQ0ZmJlMjVmMTc4MGRlZDllOTU3Yjc3ZDZmMDQ5OGJkMGI3MzEyNDEyZjljNjk3MWI4ODAxMGM0ZGU547DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _tt_enable_cookie=1; _ttp=01JXF1B7Z00TKR6HXYBSVJ2TB7_.tt.1; hfv_banner=true; _gcl_au=1.1.721021949.1760415321; _fbp=fb.1.1760415718214.238844213228639297; _SID_Tokopedia_=QtKvQu2rBRNIcphbSZ3XibGO0TNhHsbNe9oQWPDGRAxvHtqrQXdoRaFTdE4tsWFgNo1JFFigFzeiKI3uL5N7BixHS4fr9LDux0ngvzQEISgUrL0a8wzpOq4V8e7l1QNp; tuid=10836217; gec_id=46541197627375296; _CASE_=227b38103d7b637b6b68686968686d6a6e7b757b3a103d7b63686e68757b3d103d7b636c6f6a6b757b350c293d7b637b7b757b35382d7b637b746f776d686f6e6a6b6e616169616c606b606c7b757b353b357b637b0b2c34383179102b3f38377b757b3536373e7b637b68696f77616f6a6b6d6061606e6869696f7b757b291a367b637b686f6d6c687b757b2a103d7b637b697b757b2a0d20293c7b637b7b757b2e103d7b637b697b757b2e312a2a7b637b02047b24; _UUID_CAS_=c0495af8-9c6a-47a4-8172-c7efd8c895bd; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8e8a93f43611847b0ae440da48c36985.1751530474580.1751530474580.1760465180736.10%22%7D; webauthn-session=3f2e37f8-4f6e-411d-8fa1-55541da9217b; ttcsid_CPTR1KRC77UF05LN2NAG=1760892209071::dvYVW53O5B6Iv12aZy9_.6.1760892653131.0; _ga_70947XW48P=GS2.1.s1760892207$o8$g1$t1760892839$j60$l0$h0; _abck=5C8EB99A49DEC2DE44F9F5ABAC634C37~-1~YAAQxjLdFzXmbhGaAQAAz1/1Iw7TcPLYT+G0VkgU6snSoz74N8F90+u+iRQ4losCQ/0AFzrYn892YQ3Qp3R9sZCFfGRoo/PmlVHe1QB2OlT/7EBhb3y1vaZqMpZEccxl6FZ/L6+fLokbier+FRC6aCMdre/byMrAQVQ4kK9CsHWCIC1bg+iBTMqNAXbDa8qvOPXkn/JD4sSGTr3GSJKodtMmpwvnL19RMjgsIZmRW6wkt6gXcIFQ7ZQV+ZFgcJTZMPhnIgdPLhLJtIw3+7nOdWrQYK6ellAbyl2SfnuuZ29r7h2I6YXrTA5MWw4xZluinYGRqbhZUaV2jj43EjwA2IQXi0aS1PSzom75CIqilNUwV6B5eyBALMf4EK7FYVwG+ZrC4HWEsEEzYQmOw/GQyuj0WOLPOjMOXthzfgoJSI2/byDWA5AcbkZjQccT8pRYhFZzt56aiELUYONsg2R6vT9P6qv05vy2c5MBI+yKevuiHO7OdDj5zdcnTvm0aJSofCrCW7XL+D0DykJB3p1ELaib5CWSA9j4BaZgyF4dW2DkFJy30wvT7ZM0tdN2lE1ZgKoxrh2PjLNmNVmBdMShoT9Ux4H/WlnTc6nEZJ+2TP8NgciHe7J9jCOORJZUO0BPLZhfcWj5A3C6DhCFSW3x7Vde26B1F6CwT4u1GHnvZQKt/Oy8E5PamRVYcv6qIGY025IcPWwcfiZRImwSrl8MifKr5RAxLv/AkD1GKZgKGwMNLpKE8fbTyOQwtSBEZGL+Vd9gzLsMe21WqGX6PyeqaeB57hHb9KlhUpszCQUoctsv8a43cm+ISzieEx8lQ2tMyUOgiL4QNzQHAqTftz4AyJBhgLB/powKsEkCnv5ptykQfiXEwsp0dhcfGjOHFg==~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f+2S4P7v3uU7DET0+WcGFupf9v1Y%2f7MkLcjXepK9hctykwWGM2uz3fkGDL1WYJZtDF609eNTmQk9T9ajTe5dDYL+Wgkz%2fbQe4qIA~-1; _m4b_theme_=new; s_v_web_id=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn; tt_ticket_guard_client_web_domain=2; passport_csrf_token=3b0d06a6020456ecd9e424c26fbbe3d3; passport_csrf_token_default=3b0d06a6020456ecd9e424c26fbbe3d3; _ga=GA1.1.1191974235.1749630163; sso_auth_status=60c5571fb597afb325e8743ea343fb58; sso_auth_status_ss=60c5571fb597afb325e8743ea343fb58; sso_uid_tt=f7ef4a6fde47f8addcc131ba8bcdfff7c1c1b42570810b0c5f93bd2f3fe055f0; sso_uid_tt_ss=f7ef4a6fde47f8addcc131ba8bcdfff7c1c1b42570810b0c5f93bd2f3fe055f0; toutiao_sso_user=2ebfacc997675af4376baacd1f1ecd03; toutiao_sso_user_ss=2ebfacc997675af4376baacd1f1ecd03; sid_ucp_sso_v1=1.0.1-KDAyYWNlYWI1YTY0NTgyMjBmMWNjYzYyNDAyMTU1YjBiMjZjNGRhYmEKGgiHiMuAgtf8kmcQreDQyAYY5B84AUDrB0gGEAMaBm1hbGl2YSIgMmViZmFjYzk5NzY3NWFmNDM3NmJhYWNkMWYxZWNkMDMyTgogIBsqGhMQhpu3ATIJJqdPaOxD_pX01OGYRNd4sa07IQwSIEoDs3DQR4LbvKvo8wjZWO9j9FomFQ0vQeRq-JIY74QdGAUiBnRpa3Rvaw; ssid_ucp_sso_v1=1.0.1-KDAyYWNlYWI1YTY0NTgyMjBmMWNjYzYyNDAyMTU1YjBiMjZjNGRhYmEKGgiHiMuAgtf8kmcQreDQyAYY5B84AUDrB0gGEAMaBm1hbGl2YSIgMmViZmFjYzk5NzY3NWFmNDM3NmJhYWNkMWYxZWNkMDMyTgogIBsqGhMQhpu3ATIJJqdPaOxD_pX01OGYRNd4sa07IQwSIEoDs3DQR4LbvKvo8wjZWO9j9FomFQ0vQeRq-JIY74QdGAUiBnRpa3Rvaw; uid_tt=3d7d1be13e6040d82529cb7654f0d93e3ecc2bb23d8b3b57edf1a394f0ff3458; uid_tt_ss=3d7d1be13e6040d82529cb7654f0d93e3ecc2bb23d8b3b57edf1a394f0ff3458; sid_tt=06b4b923cd4f4c9e1ca85e28a7ecdf1c; sessionid=06b4b923cd4f4c9e1ca85e28a7ecdf1c; sessionid_ss=06b4b923cd4f4c9e1ca85e28a7ecdf1c; msToken=dmASSX3fKu-lKf7D_q2kNXXUwH2VbqJFt2vK01eBY3uP0pvQWAx7r_F-eQCxnpq5r0eGAWPkzLclN0qzScvIpYa7wSwy_6uxcLbLKL0WvEikdKRLb8csc2vFoAth; i18next=en; gs_seller_type_for_report=pop; goofy_grayscale_uid=d29e92b34ae0e7ef2f5b099ce8a9e98e; test_flag=0; _tt_ticket_crypt_doamin=2; sid_guard=06b4b923cd4f4c9e1ca85e28a7ecdf1c%7C1762967812%7C259200%7CSat%2C+15-Nov-2025+17%3A16%3A52+GMT; tt_session_tlb_tag=sttt%7C3%7CBrS5I81PTJ4cqF4op-zfHP_________GrOOkCzwufEKlV-Ta-LL555N6MsM5nj0_KxoXq0H-sNo%3D; sid_ucp_v1=1.0.1-KDJiYjg4Mjc2MjE3OTQwOTU2ODRiOWE0NGVjNTViYzc4ZmNkMDE4MDEKGgiHiMuAgtf8kmcQhILTyAYY5B84AUDrB0gEEAMaAm15IiAwNmI0YjkyM2NkNGY0YzllMWNhODVlMjhhN2VjZGYxYzJOCiB5zrzTbVODJImMAtlmdMR7f_5jqyZBpzxVamswIJi3mxIgYKX9E93mv2XvgXjoaHY80qWlzTiDl2O3ekIAok2UqzoYBCIGdGlrdG9r; ssid_ucp_v1=1.0.1-KDJiYjg4Mjc2MjE3OTQwOTU2ODRiOWE0NGVjNTViYzc4ZmNkMDE4MDEKGgiHiMuAgtf8kmcQhILTyAYY5B84AUDrB0gEEAMaAm15IiAwNmI0YjkyM2NkNGY0YzllMWNhODVlMjhhN2VjZGYxYzJOCiB5zrzTbVODJImMAtlmdMR7f_5jqyZBpzxVamswIJi3mxIgYKX9E93mv2XvgXjoaHY80qWlzTiDl2O3ekIAok2UqzoYBCIGdGlrdG9r; ATLAS_LANG=en; pre_country=ID; lang_type=en; passport_fe_beating_status=true; ttwid=1%7CDmzLYDAMXkwdyXc7CqNnNDRg7BhO108hrXcl57YhkHo%7C1763124976%7C208446d651e666d70ded108117aa2f3c7b8d6fbcad4c544bdf8bfd51824cda02; tt_ticket_guard_client_data=eyJ0dC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwidHQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJ0dC10aWNrZXQtZ3VhcmQtc2NlbmUiOiJ0dF9zZWxsZXIiLCJ0dC10aWNrZXQtZ3VhcmQtb3JpZ2luLWNyeXB0Ijoie1wiZWNfcHJpdmF0ZUtleVwiOlwiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXFxuTUlHSEFnRUFNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQkcwd2F3SUJBUVFnWmxlaXVRS2Yxd0FjOGtCM1VmSE50SUFlb280VzRmdTFxbzJEZVl4Z3JaT2hSQU5DQUFTYWZPdkNRd3M0NkpYcml6VFh1bGQ0WDFzRklnSGJ4Z3ZnSGhTaElUVHovQ1EzaHVyVytoQS9IbTA3VXllQUoxcGNDWmVXeWFwTndMOFozVndoMnNUclxcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cIixcImVjX3B1YmxpY0tleVwiOlwiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cXG5NRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVtbnpyd2tNTE9PaVY2NHMwMTdwWGVGOWJCU0lCMjhZTDRCNFVvU0UwOC93a040YnExdm9RUHg1dE8xTW5nQ2RhWEFtWGxzbXFUY0MvR2QxY0lkckU2dz09XFxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXCIsXCJlY19jc3JcIjpcIlwifSIsInR0LXRpY2tldC1ndWFyZC1wdWJsaWMta2V5IjoiQkpwODY4SkRDempvbGV1TE5OZTZWM2hmV3dVaUFkdkdDK0FlRktFaE5QUDhKRGVHNnRiNkVEOGViVHRUSjRBbldsd0psNWJKcWszQXZ4bmRYQ0hheE9zPSIsInR0LXRpY2tldC1ndWFyZC13ZWItdmVyc2lvbiI6MX0%3D; _ga_BZBQ2QHQSP=GS2.1.s1763124993$o4$g0$t1763124993$j60$l0$h1876965981; ttcsid=1763125006519::InY3GI6NGI6NWRHOOW9U.9.1763125009726.0; ttcsid_CMSS13RC77U1PJEFQUB0=1763125006517::9Yfr5w4VvxrbdDzaA5YU.3.1763125009726.0; gd_random=eyJtYXRjaCI6dHJ1ZSwicGVyY2VudCI6MC4wMjU2MzUyNjM4MzQyNzU3MjN9.UnvipDNXQpppRdfdQ4uc9jlM+qayAx+/wt1Bg3np9rU=; odin_tt=49fb4c2d7ef1cfcca609e4e0d825adc1488173b4cd18258929eefc8eacccc64b8ee86c58e7bff3475ec19da17e20db88; msToken=wYW-GKZRGa0J0sGnKu4bV309Zn4wcZnKzF8eOyL51AsQHecER5qbKTirs0GkFawWV4pVRz2RldN8csdzqQO6oYZYGmPTooTdLdb0b6n_iITnbqisVJQm8fm2UKB0vIoc4obgaC7O; user_oec_info=0a53c2479c80f9d36a11b58064ef1a798d90b62b4e1f1338d45897ecc0f4c19de4c095021d49a9d9bed3d8f08625c79d78ac60979f7fb214983ab7eeb50c6693633c9c90072f7055b6a22d35c419e9ad680561ecb01a490a3c000000000000000000004fb7493ed4d329cea1e99868ed4d7462f3914eedbd77df309148d1e1375ca2fa5ac1972a9f5988036d5b55b8c8c1c26658d110aecc810e1886d2f6f20d2201042935f6cf; _dd_s=logs=1&id=b0a4f56a-8941-44e3-a829-aa3683f77bda&created=1763176772708&expire=1763178659032',
            "priority": "u=1, i",
            "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      // Save ke Prisma
      await prisma.productStats.create({
        data: {
          id: crypto.randomUUID(),
          roomId,
          stats: data,
        },
      });

    }

    return NextResponse.json({
      success: true,
      message: "Cron product has been success",
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
