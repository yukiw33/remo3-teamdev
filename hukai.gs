function discomfort(te,hu){
  return 0.81 * te + 0.01 * hu * (0.99 * te - 14.3) + 46.3
}
