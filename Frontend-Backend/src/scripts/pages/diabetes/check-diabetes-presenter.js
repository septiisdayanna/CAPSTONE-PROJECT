import * as tf from '@tensorflow/tfjs';

const DiabetesCheckPresenter = {
  async init({ form, resultContainer }) {
    this._form = form;
    this._resultContainer = resultContainer;
    this._model = await tf.loadGraphModel('/model_diabetes_tfjs/model.json');

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._predict();
    });
  },

  _mapAgeToCategory(age) {
    if (age >= 31 && age <= 40) return 1;
    if (age >= 41 && age <= 50) return 2;
    if (age >= 51 && age <= 60) return 3;
    if (age >= 61 && age <= 70) return 4;
    if (age >= 71 && age <= 80) return 5;
    if (age > 80) return 6;
    return 0;
  },

  async _predict() {
    const formData = new FormData(this._form);
    const rawAge = Number(formData.get('Age'));
    if (rawAge < 31) {
      this._resultContainer.innerHTML =
        `<p class="text-red-600 font-semibold">⚠️ Usia minimal 31 tahun untuk prediksi yang akurat.</p>`;
      return;
    }

    const input = [
      Number(formData.get('HighBP')),
      Number(formData.get('HighChol')),
      Number(formData.get('CholCheck')),
      Number(formData.get('Smoker')),
      Number(formData.get('Stroke')),
      Number(formData.get('HeartDiseaseorAttack')),
      Number(formData.get('PhysActivity')),
      Number(formData.get('Fruits')),
      Number(formData.get('Veggies')),
      Number(formData.get('HvyAlcoholConsump')),
      Number(formData.get('GenHlth')),
      Number(formData.get('MentHlth')),
      Number(formData.get('PhysHlth')),
      Number(formData.get('DiffWalk')),
      Number(formData.get('Sex')),
      this._mapAgeToCategory(rawAge),
      Number(formData.get('BMI_clapped')),
    ];

    const inputTensor = tf.tensor2d([input]);

    const outputTensor = this._model.predict(inputTensor);
    const prob = Array.isArray(outputTensor)
      ? (await outputTensor[0].data())[0]
      : (await outputTensor.data())[0];

    inputTensor.dispose();
    Array.isArray(outputTensor)
      ? outputTensor.forEach(t => t.dispose())
      : outputTensor.dispose();

    // Menampilkan hasil dyagnosys
    let resultHtml;
    if (prob >= 0.7) {
      resultHtml = `<p class="text-red-600 font-semibold text-lg">⚠️ Risiko diabetes tinggi (${(prob*100).toFixed(1)}%)</p>`;
    } else if (prob >= 0.4) {
      resultHtml = `<p class="text-yellow-600 font-semibold text-lg">⚠️ Risiko diabetes sedang (${(prob*100).toFixed(1)}%)</p>`;
    } else {
      resultHtml = `<p class="text-green-600 font-semibold text-lg">✅ Risiko diabetes rendah (${(prob*100).toFixed(1)}%)</p>`;
    }

    this._resultContainer.innerHTML = resultHtml + this._generateRecommendation(prob);
  },

  _generateRecommendation(prob) {
  const baseClass = "mt-2 p-4 rounded-md border text-sm space-y-2";
  if (prob >= 0.7) {
    return `
      <div class="${baseClass} border-red-300 bg-red-50">
        <h3 class="font-semibold text-red-700">Rekomendasi Risiko Tinggi:</h3>
        <ul class="list-disc list-inside text-gray-800 space-y-1">
          <li>Hindari gula, nasi putih, gorengan.</li>
          <li>Kurangi duduk lama, atur pola tidur.</li>
          <li>Konsumsi sayur hijau, gandum utuh, buah rendah gula.</li>
          <li>Olahraga ringan rutin, cek gula darah berkala.</li>
          <li>Konsultasi dengan dokter spesialis.</li>
        </ul>
      </div>`;
  } else if (prob >= 0.4) {
    return `
      <div class="${baseClass} border-yellow-300 bg-yellow-50">
        <h3 class="font-semibold text-yellow-700">Rekomendasi Risiko Sedang:</h3>
        <ul class="list-disc list-inside text-gray-800 space-y-1">
          <li>Batasi makanan manis & olahan.</li>
          <li>Tingkatkan aktivitas, hindari alkohol berlebih.</li>
          <li>Konsumsi kacang-kacangan & yogurt rendah gula.</li>
          <li>Olahraga 3× seminggu, pantau kadar gula.</li>
          <li>Konsultasi jika ada gejala pradiabetes.</li>
        </ul>
      </div>`;
  } else {
    return `
      <div class="${baseClass} border-green-300 bg-green-50">
        <h3 class="font-semibold text-green-700">Rekomendasi Risiko Rendah:</h3>
        <ul class="list-disc list-inside text-gray-800 space-y-1">
          <li>Kurangi gula dan makanan cepat saji.</li>
          <li>Pertahankan gaya hidup aktif.</li>
          <li>Konsumsi makanan seimbang & sayur-buah.</li>
          <li>Olahraga teratur, jaga berat badan.</li>
          <li>Teruskan pola hidup sehat.</li>
        </ul>
      </div>`;
  }
  },
};

export default DiabetesCheckPresenter;
