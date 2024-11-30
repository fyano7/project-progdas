let produkArray = [];
let autoincrement = 1;
let editIndex = -1;

function saveForm() {
  const kodeproduk = "MD-0" + autoincrement++;
  const namaproduk = document.getElementById("namaproduk").value;
  const satuan = document.getElementById("satuan").value;
  const kategori = document.getElementById("kategori").value;
  const hargaproduk = document.getElementById("hargaproduk").value;
  const urlimage = document.getElementById("urlimage").value;
  const stokproduk = document.getElementById("stokproduk").value;

  if (editIndex === -1) {
    // Jika tidak dalam mode edit, tambahkan produk baru
    produkArray.push({
      kodeproduk,
      namaproduk,
      satuan,
      kategori,
      hargaproduk,
      urlimage,
      stokproduk,
    });
  } else {
    // Jika dalam mode edit, update produk yang ada
    produkArray[editIndex] = {
      kodeproduk: produkArray[editIndex].kodeproduk,
      namaproduk,
      satuan,
      kategori,
      hargaproduk,
      urlimage,
      stokproduk,
    };
    editIndex = -1; // Reset editIndex setelah edit
  }

  renderTable();
  clearForm();
}

function renderTable() {
  const tablebody = document
    .getElementById("productTable")
    .getElementsByTagName("tbody")[0];
  tablebody.innerHTML = "";

  produkArray.forEach((product, index) => {
    const row = tablebody.insertRow();

    const validate_stock = product.stokproduk < 5 ? "low-stock" : "hight-stock";
    console.log("URL Gambar:", product.urlimage);
    row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.kodeproduk}</td>
            <td>${product.namaproduk}</td>
            <td> ${product.kategori}</td>
            <td>${product.satuan}</td>
            <td >${product.hargaproduk}</td>
             <td class="${validate_stock}">${product.stokproduk}</td>
            <td><img src="${product.urlimage}" alt="${
      product.namaproduct
    }" style="width: 100px; height: 100px; align-item: center;"></td>
            <td>
                <button class="edit" onclick="editProduct(${index})">Edit</button>
                <button class="delete" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
  });
}

function editProduct(index) {
  const product = produkArray[index];
  document.getElementById("namaproduk").value = product.namaproduk;
  document.getElementById("hargaproduk").value = product.hargaproduk;
  document.getElementById("kategori").value = product.kategori;
  document.getElementById("urlimage").value = product.urlimage;
  document.getElementById("stokproduk").value = product.stokproduk;

  editIndex = index; // Set editIndex ke produk yang sedang diedit
}

function deleteProduct(index) {
  produkArray.splice(index, 1); // Menghapus produk dari array
  renderTable(); // Render ulang tabel setelah penghapusan
}

function clearForm() {
  document.getElementById("namaproduk").value = "";
  document.getElementById("hargaproduk").value = "";
  document.getElementById("kategori").value = "makanan"; // Reset ke default
  document.getElementById("urlimage").value = "";
  document.getElementById("stokproduk").value = "";
}
