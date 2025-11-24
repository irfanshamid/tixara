import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getJakartaTime } from "@/utils/helper";
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
            "Cookie": "DID=a8e0bd4eb23794d9be2564131b58730856a78d4fbe25f1780ded9e957b77d6f0498bd0b7312412f9c6971b88010c4de9; _tt_enable_cookie=1; _ttp=01JXF1B7Z00TKR6HXYBSVJ2TB7_.tt.1; hfv_banner=true; _gcl_au=1.1.721021949.1760415321; _fbp=fb.1.1760415718214.238844213228639297; _CASE_=227b38103d7b637b6b68686968686d6a6e7b757b3a103d7b63686e68757b3d103d7b636c6f6a6b757b350c293d7b637b7b757b35382d7b637b746f776d686f6e6a6b6e616169616c606b606c7b757b353b357b637b0b2c34383179102b3f38377b757b3536373e7b637b68696f77616f6a6b6d6061606e6869696f7b757b291a367b637b686f6d6c687b757b2a103d7b637b697b757b2a0d20293c7b637b7b757b2e103d7b637b697b757b2e312a2a7b637b02047b24; _UUID_CAS_=c0495af8-9c6a-47a4-8172-c7efd8c895bd; ISID=%7B%22www.tokopedia.com%22%3A%22d3d3LnRva29wZWRpYS5jb20%3D.8e8a93f43611847b0ae440da48c36985.1751530474580.1751530474580.1760465180736.10%22%7D; ttcsid_CPTR1KRC77UF05LN2NAG=1760892209071::dvYVW53O5B6Iv12aZy9_.6.1760892653131.0; s_v_web_id=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn; tt_ticket_guard_client_web_domain=2; passport_csrf_token=3b0d06a6020456ecd9e424c26fbbe3d3; passport_csrf_token_default=3b0d06a6020456ecd9e424c26fbbe3d3; sso_auth_status=60c5571fb597afb325e8743ea343fb58; sso_auth_status_ss=60c5571fb597afb325e8743ea343fb58; i18next=en; gs_seller_type_for_report=pop; _tt_ticket_crypt_doamin=2; ATLAS_LANG=en; pre_country=ID; lang_type=en; passport_fe_beating_status=true; d_ticket=449def365b757bd9ad420bf0a50bfcf9526bf; gd_random=eyJtYXRjaCI6dHJ1ZSwicGVyY2VudCI6MC4wMjU2MzUyNjM4MzQyNzU3MjN9.UnvipDNXQpppRdfdQ4uc9jlM+qayAx+/wt1Bg3np9rU=; l=0; aus=0; laf=0; TOPATK=0; TOPRTK=0; tuid=0; _tu_prod=0; gec_id=0; uidh=0; uide=0; _CAS_=0; FPF=0; shipping_notif=0; lasty=; g_yolo_production=1; DID_JS=YThlMGJkNGViMjM3OTRkOWJlMjU2NDEzMWI1ODczMDg1NmE3OGQ0ZmJlMjVmMTc4MGRlZDllOTU3Yjc3ZDZmMDQ5OGJkMGI3MzEyNDEyZjljNjk3MWI4ODAxMGM0ZGU547DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=; _abck=5C8EB99A49DEC2DE44F9F5ABAC634C37~0~YAAQNRreF42k/ZyaAQAAr9cZsg7RhLx8oNif9ejndvnbJAviuZiHtH8NKHPKZX1Vf3/MiiNIdqrAsZQ4AJrWNuZmFSq1u2dk8M5NOzpW/SXsy0mHPrse9HgOD9ga3TOCwFnFXjIngllQZzWYL0NerSuHD7uyFCH7ffAM5RrzxBxEoB+w99Zw/jas+61YdxhtRkgu7EDiwuZA6cksIsWWqIuDhqQjFtEFrZhLixrXAPmbhcBUNY2ykj62u3FgdE+B9mZ7Z02V00pTLtHjo7LT1WQUKN4npulQD+umTQVChJUd9gVpMYb69AvWOjW3yVbkvGJUjHdocOIaL4QCx1ydiBtqyyTHnvS4P7PnZgPcGNzlppVfGPDXYi19H2FdY+A/WsuScfTahxUH6T8JWY2Km58fuIJjYnyiLzUfjmxxmmkiLAEBktCrLsZxqZ7OzFDYR9FAUPGQgCszYyM7gULxRWZL9MGconCOF9Ku/fczG7XT+I3v7vZ12lekRqjlAPxBX+xGoUDSiHvNH71R31frhqCp46LZZ7bL6a51+IADYMkJO4Ysn6OlM72neka6Fv9gohmT3Sm0E69zy4Yl+w5If8bL0QFo0clC9TkQB/3r1H9PPA4dDyfXzr2i6LCSxReUYoCUprc2U+Lma1pdmcLFd3UQbpQWJmI+1ku0v11IvR6lruXB32cIBzSVT9kL/DR3mzJBa3zh+gKRxDoxyBe1qQMAwTVG9lMynYDZE2CwFg/ij44niD8yRiBte07LnvcuwkmDUVesvK1n5Ms2um1oSdG3egULVAyCiaCT2tJlwn4yBu4PAyFzQ0CdAvkgBJbpSdsPeWYE2NdZ0uLUi3ooZawgxG3i69Wp/0Sp3qQc~-1~-1~-1~AAQAAAAE%2f%2f%2f%2f%2f0YgjJpO+sn8UGQLYm0YiVTZPZwKplnp5Yz2bhoyOVrl+ydogoijEkBu6XuLVZrSpl6b7LT01BMnTyIFsElbKAAu9OVNRmEPeC+f~-1; _gid=GA1.2.1030526877.1763924663; _ga_70947XW48P=GS2.1.s1763924663$o10$g0$t1763924663$j60$l0$h0; _ga=GA1.1.1191974235.1749630163; tt_ticket_guard_client_data=eyJ0dC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwidHQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJ0dC10aWNrZXQtZ3VhcmQtc2NlbmUiOiJ0dF9zZWxsZXIiLCJ0dC10aWNrZXQtZ3VhcmQtb3JpZ2luLWNyeXB0Ijoie1wiZWNfcHJpdmF0ZUtleVwiOlwiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXFxuTUlHSEFnRUFNQk1HQnlxR1NNNDlBZ0VHQ0NxR1NNNDlBd0VIQkcwd2F3SUJBUVFnWmxlaXVRS2Yxd0FjOGtCM1VmSE50SUFlb280VzRmdTFxbzJEZVl4Z3JaT2hSQU5DQUFTYWZPdkNRd3M0NkpYcml6VFh1bGQ0WDFzRklnSGJ4Z3ZnSGhTaElUVHovQ1EzaHVyVytoQS9IbTA3VXllQUoxcGNDWmVXeWFwTndMOFozVndoMnNUclxcbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cIixcImVjX3B1YmxpY0tleVwiOlwiLS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS1cXG5NRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVtbnpyd2tNTE9PaVY2NHMwMTdwWGVGOWJCU0lCMjhZTDRCNFVvU0UwOC93a040YnExdm9RUHg1dE8xTW5nQ2RhWEFtWGxzbXFUY0MvR2QxY0lkckU2dz09XFxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXCIsXCJlY19jc3JcIjpcIlwifSIsInR0LXRpY2tldC1ndWFyZC1wdWJsaWMta2V5IjoiQkpwODY4SkRDempvbGV1TE5OZTZWM2hmV3dVaUFkdkdDK0FlRktFaE5QUDhKRGVHNnRiNkVEOGViVHRUSjRBbldsd0psNWJKcWszQXZ4bmRYQ0hheE9zPSIsInR0LXRpY2tldC1ndWFyZC13ZWItdmVyc2lvbiI6MX0%3D; ttcsid=1763966826701::KrxHoTS4HncZ2Xviqbdl.15.1763967181322.0; ttcsid_CMSS13RC77U1PJEFQUB0=1763966826701::QVLldGAUMHtlY2KmhvuW.9.1763967181323.0; sso_uid_tt=e5b30c2459e1b1c81b3ed6a5c57b9391d3d20f574e54dd6dab63f457309281af; sso_uid_tt_ss=e5b30c2459e1b1c81b3ed6a5c57b9391d3d20f574e54dd6dab63f457309281af; toutiao_sso_user=93dcdba3ed7291d605d8ddc515c85d8f; toutiao_sso_user_ss=93dcdba3ed7291d605d8ddc515c85d8f; sid_ucp_sso_v1=1.0.1-KGU5OGQ4Nzc3M2YzM2MwNjQ1MDFmNjZiMTA4ZmMwMzI3NDU3NzU0ZDUKIgiHiMuAgtf8kmcQ04GQyQYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiA5M2RjZGJhM2VkNzI5MWQ2MDVkOGRkYzUxNWM4NWQ4ZjJOCiDm9NcQcT4LgRJLPoa1pBrKgmTV8oE4YOkbcnApwiHHXxIga-EXRISi4yJvvDWC9tkN7qAcH2ppY52Co3kdzdjOaEQYBCIGdGlrdG9r; ssid_ucp_sso_v1=1.0.1-KGU5OGQ4Nzc3M2YzM2MwNjQ1MDFmNjZiMTA4ZmMwMzI3NDU3NzU0ZDUKIgiHiMuAgtf8kmcQ04GQyQYY5B8gDDCi6Ze5BjgBQOsHSAYQAxoGbWFsaXZhIiA5M2RjZGJhM2VkNzI5MWQ2MDVkOGRkYzUxNWM4NWQ4ZjJOCiDm9NcQcT4LgRJLPoa1pBrKgmTV8oE4YOkbcnApwiHHXxIga-EXRISi4yJvvDWC9tkN7qAcH2ppY52Co3kdzdjOaEQYBCIGdGlrdG9r; _ga_BZBQ2QHQSP=GS2.1.s1763967183$o10$g0$t1763967183$j60$l0$h2017002108; odin_tt=e8b21ed65e9a39aad8a2f059d04ac57175aa117df824fdd8859cbb20fc88db32ee24bd3c53f9a2d84a6c4c2c83a75429c8bcc3409679e27f002ed7c93a7f82e9; tt_ticket_guard_server_data=eyJ0aWNrZXQiOiIyY2MwNjU1ZTkwODQxNzE2NDIzMWQ1OWFlYmI4OGFjNyIsInRzX3NpZ24iOiJ0cy4xLmIzOTQwMGE1ZTNkNmM3MjNkYjhmMjE4N2NlY2VjOTg2ZWMxMjIwYjBiNDViNmZkNDZlMTJmNjk5MThmNDQwYzQwZTcwYjRiZGE4MmMxMzgzNmU1Y2ZhMTgzOTRkNzAyNDBmOGFmMTYzMWYxNjVhZTk2MDEyMmVlZmZkNDUzM2RkIn0%3D; tt_ticket_guard_web_domain=2; sid_guard=2cc0655e908417164231d59aebb88ac7%7C1763967188%7C259199%7CThu%2C+27-Nov-2025+06%3A53%3A07+GMT; uid_tt=d5f3af3dad11a5a77c25132526ac260f061636ca98cb73c605a258d1bfaca694; uid_tt_ss=d5f3af3dad11a5a77c25132526ac260f061636ca98cb73c605a258d1bfaca694; sid_tt=2cc0655e908417164231d59aebb88ac7; sessionid=2cc0655e908417164231d59aebb88ac7; sessionid_ss=2cc0655e908417164231d59aebb88ac7; tt_session_tlb_tag=sttt%7C4%7CLMBlXpCEFxZCMdWa67iKx__________iGT3T-_y5H69LE60PJ8HxNLvps2rAymAdnCCzrp1QBjE%3D; sid_ucp_v1=1.0.1-KDQwZDYwYzcwMTBmNGI0YjFmN2RlZWVjMTI0ZjEyNDRmNGYxMThlYzkKHAiHiMuAgtf8kmcQ1IGQyQYY5B8gDDgBQOsHSAQQAxoDbXkyIiAyY2MwNjU1ZTkwODQxNzE2NDIzMWQ1OWFlYmI4OGFjNzJOCiC69CGOhtKRNenlzAkYPNd7S7ouqgTNkJXm_zMyLsjV9BIgUB-EOCdYJk_Nn4VHaT2qYTbGNYtNI8dAOpKos0fi8kUYBSIGdGlrdG9r; ssid_ucp_v1=1.0.1-KDQwZDYwYzcwMTBmNGI0YjFmN2RlZWVjMTI0ZjEyNDRmNGYxMThlYzkKHAiHiMuAgtf8kmcQ1IGQyQYY5B8gDDgBQOsHSAQQAxoDbXkyIiAyY2MwNjU1ZTkwODQxNzE2NDIzMWQ1OWFlYmI4OGFjNzJOCiC69CGOhtKRNenlzAkYPNd7S7ouqgTNkJXm_zMyLsjV9BIgUB-EOCdYJk_Nn4VHaT2qYTbGNYtNI8dAOpKos0fi8kUYBSIGdGlrdG9r; msToken=0YdRZHls0aA32y4mme948ryMK1_ZchMJA4qaTVoyluLCq6X7Wo2fkAjpwEmZL1lsCrEj5QB87h06xXR1knUQDY3QsR2HxtU713CUbrPKYVibLr0arXUx3B4tR90MlJ01PVHaj8Ns; global_seller_id_unified_seller_env=7494930113907558878; app_id_unified_seller_env=4068; oec_seller_id_unified_seller_env=7494930113907558878; user_oec_info=0a53119bf6bff415cf1480eb575236cf7755c479ef31f1042a104245cfd214b50acfa4a5795d65b7f515d3e8b511b595c0e1e7191617bc00ce0402cd9d12e51d2b3d478b55eb156663027b13aab85f5b3680cf8ca81a490a3c000000000000000000004fc0c307a0eb5dc0e1f9369476fb94ff851a71ec738da19792fa3f31e7517acc638c2d0f34b9538ce68ae89e3a114fd490ef10dcb2820e1886d2f6f20d22010451215182; ttwid=1%7CDmzLYDAMXkwdyXc7CqNnNDRg7BhO108hrXcl57YhkHo%7C1763967202%7C87af2a649729ce1cfa51d567ee16ace742c477bdf856f8a13f424645c5dad72b; SELLER_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjc0MzI2MTM2MzI2NzA4NzY2NzksIk9lY1VpZCI6NzQ5NTk3OTY5NDUzOTU3Mzk0NCwiT2VjU2hvcElkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJTaG9wUmVnaW9uIjoiIiwiR2xvYmFsU2VsbGVySWQiOjc0OTQ5MzAxMTM5MDc1NTg4NzgsIlNlbGxlcklkIjo3NDk0OTMwMTEzOTA3NTU4ODc4LCJleHAiOjE3NjQwNTM2MDUsIm5iZiI6MTc2Mzk2NjIwNX0.dGkaYIKJFFYeiBV8eAraXuzjt_9ncctfvEZ6ZdEHGsQ; _dd_s=logs=1&id=daacad54-bbce-4a0b-bdc8-ec2ce26b78c0&created=1763966826687&expire=1763968110918; msToken=k1Ky5A8Ol4n91mGzSAe_4sR2LqNkizcN1eQU9I9NNKlMT_G7vQuHZ2FIu5U7CpGaXiPNLAec1KVa7w84cHKx_HaiQOD3p3iYUFKCtctCg23Tub0bFTACS-BdFsK2jvJeYRq85Ikdlw==",
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
              createdAt: getJakartaTime()
            },
            create: {
              id: crypto.randomUUID(),
              roomId: String(liveId),
              username: item.creator_meta?.handle ?? "",
              displayName: item.creator_meta?.display_name ?? null,
              stats: item,
              createdAt: getJakartaTime()
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
