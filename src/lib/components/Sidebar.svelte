<script lang="ts">
  import { adm, lvl } from '$lib/stores/atlas';
  const options = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
</script>

<div class="container">
  <span class="title">
    <img src="/img/logo-192.png" alt="logo" />
    <h1>Atlas</h1>
  </span>
  <h2>Names</h2>
  <table>
    <tbody>
      <tr>
        <td>ADM0: </td>
        <td>{$adm.adm0_name ?? $adm.adm0_name1 ?? ''}</td>
      </tr>
      {#each [...Array($lvl).keys()] as l}
        <tr>
          <td>ADM{l + 1}: </td>
          <td>
            {[$adm[`adm${l + 1}_name`], $adm[`adm${l + 1}_name1`], $adm[`adm${l + 1}_name2`]]
              .filter(Boolean)
              .join(', ')}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <h2>Codes</h2>
  <table>
    <tbody>
      <tr>
        <td>ADM0: </td>
        <td>{[$adm.iso_3, $adm.iso_2].filter(Boolean).join(', ')}</td>
      </tr>
      {#each [...Array($lvl).keys()] as l}
        <tr>
          <td>ADM{l + 1}: </td>
          <td>
            {[$adm[`adm${l + 1}_src`]].filter(Boolean).join(', ')}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  <h2>Metadata</h2>
  <table>
    <tbody>
      {#if $lvl !== 0}
        <tr>
          <td>Source: </td>
          <td>{$adm.src_name ?? ''}</td>
        </tr>
        <tr>
          <td>Contributor: </td>
          <td>{$adm.src_name1 ?? ''}</td>
        </tr>
        <tr>
          <td>Date of Dataset: </td>
          <td
            >{$adm.src_date ? new Date($adm.src_date).toLocaleDateString('en-GB', options) : ''}</td
          >
        </tr>
        <tr>
          <td>Updated: </td>
          <td>
            {$adm.src_update ? new Date($adm.src_update).toLocaleDateString('en-GB', options) : ''}
          </td>
        </tr>
      {/if}
      <tr>
        <td>Status: </td>
        <td>{$adm.status_nm ?? ''}</td>
      </tr>
      <tr>
        <td>Region: </td>
        <td>{$adm.region1_nm ?? ''}</td>
      </tr>
      <tr>
        <td>Sub-region: </td>
        <td>{$adm.region2_nm !== $adm.region1_nm ? $adm.region2_nm : ''}</td>
      </tr>
      <tr>
        <td>Interm Region: </td>
        <td>{$adm.region3_nm !== $adm.region2_nm ? $adm.region3_nm : ''}</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  @media only screen and (max-width: 768px) {
    .container {
      height: 33%;
    }
    h1,
    img {
      display: none;
    }
  }
  @media only screen and (min-width: 769px) {
    .container {
      width: 25rem;
    }
  }

  .container {
    overflow: auto;
    padding: 20px;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  .container > span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .container > span > h1 {
    margin-left: 10px;
  }

  .container > span > img {
    width: 50px;
    height: 50px;
  }
</style>
