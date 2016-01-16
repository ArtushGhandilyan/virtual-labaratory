package ru.mipt1c.laboratory.utils;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Created by eyesoft on 12/25/2015.
 */
public class FileUtils {


    /**
     * Downloads file from given URL and write it to given file path.
     * @param fileURL                           URl, from which file will be downloaded.
     * @param downloadedFilePath                File path, where file will be written after download.
     * @throws IOException                      Throws in case of any IO problem.
     */
    public static void downloadFile(String fileURL, String downloadedFilePath) throws IOException{
        URL url;
        InputStream inputStream = null;
        FileOutputStream fileOutputStream = null;
        FileUtils.setAllCertsTrusted();

        url = new URL(fileURL);
        URLConnection urlConn = url.openConnection();
        inputStream = openConnectionCheckRedirects(urlConn);

        ReadableByteChannel rbc = Channels.newChannel(inputStream);
        fileOutputStream = new FileOutputStream(downloadedFilePath);
        fileOutputStream.getChannel().transferFrom(rbc, 0, Long.MAX_VALUE);

    }


    /**
     * Method, which gets inputStream from URLConnection, with checks redirection during request handling.
     * @param conn                  Given URLConnection.
     * @return                      InputStream got from last URLConnection.
     * @throws IOException          Throws in case of any IO problem.
     */
    private static InputStream openConnectionCheckRedirects(URLConnection conn) throws IOException{
        boolean redirect;
        InputStream in = null;
        do {
            if (conn instanceof HttpURLConnection) {
                ((HttpURLConnection) conn).setInstanceFollowRedirects(false);
            }

            in = conn.getInputStream();
            redirect = false;
            if (conn instanceof HttpURLConnection) {
                HttpURLConnection http = (HttpURLConnection) conn;
                URL website;
                int stat = http.getResponseCode();

                if (stat >= 300 && stat <= 307 && stat != 306 && stat != HttpURLConnection.HTTP_NOT_MODIFIED) {
                    redirect = true;
                    website = new URL(http.getHeaderField("Location"));
                    conn = website.openConnection();
                } else {
                    return in;
                }
            } else {
                return in;
            }
        }
        while (redirect);
        return in;
    }



    /**
     * Unzip the given zip file into the given output directory.
     * @param zipFile                      Provided zip file path.
     * @param outputFolder                 Directory path, where zip file should be unpacked.
     * @exception IOException      Throws in case of any IO problem.
     */
    public static void unzipFile(String zipFile, String outputFolder) throws IOException{

        byte[] buffer = new byte[1024];

        //create output directory is not exists
        File folder = new File(outputFolder);
        if(!folder.exists()){
            folder.mkdir();
        }

        //get the zip file content
        ZipInputStream zis = new ZipInputStream(new FileInputStream(zipFile));
        //get the zipped file list entry
        ZipEntry ze = zis.getNextEntry();

        while(ze != null){

            String fileName = ze.getName();
            File newFile = new File(outputFolder + File.separator + fileName);

            //create all non exists folders
            //else you will hit FileNotFoundException for compressed folder
            new File(newFile.getParent()).mkdirs();
            FileOutputStream fos = new FileOutputStream(newFile);

            int len;
            while ((len = zis.read(buffer)) > 0) {
                fos.write(buffer, 0, len);
            }

            fos.close();
            ze = zis.getNextEntry();
        }

        zis.closeEntry();
        zis.close();

    }



    public static void setAllCertsTrusted() {
        TrustManager[] trustAllCerts = new TrustManager[] {
                new X509TrustManager() {
                    public X509Certificate[] getAcceptedIssuers() {return null;}
                    public void checkClientTrusted(X509Certificate[] certs, String authType) {}
                    public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                }
        };

        try {
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        }
        catch (NoSuchAlgorithmException | KeyManagementException e) {
            e.printStackTrace();
        }
    }

}
