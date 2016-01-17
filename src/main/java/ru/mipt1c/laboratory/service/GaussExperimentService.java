package ru.mipt1c.laboratory.service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.mipt1c.laboratory.db.GaussExperimentDBManager;
import ru.mipt1c.laboratory.db.RoleDBManager;
import ru.mipt1c.laboratory.db.dto.GaussExperimentFilesCondition;
import ru.mipt1c.laboratory.db.dto.GaussExperimentFilesDto;
import ru.mipt1c.laboratory.db.dto.RoleDto;
import ru.mipt1c.laboratory.model.asynch.json.AsynchResponseJson;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class GaussExperimentService {

    private static Logger LOGGER = Logger.getLogger(GaussExperimentService.class);

    @Autowired
    GaussExperimentDBManager gaussExperimentDBManager;


    public Integer saveFile(MultipartFile file, String fileName, Integer access, Integer userId) {
        GaussExperimentFilesDto dto = new GaussExperimentFilesDto();
        dto.setAccess(access);
        dto.setName(fileName);
        dto.setUserid(userId);

        Integer fileId = gaussExperimentDBManager.insertFile(dto);
        String name = ConfigProvider.getGaussFilesBaseFolderPath() + fileId + ".csv";

        try {
            byte[] bytes = file.getBytes();
            BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(name)));
            stream.write(bytes);
            stream.close();

        } catch (Exception e) {
            LOGGER.error("Error with saving file into the file system.");
            LOGGER.info("Rollback file upload operation.");
//            gaussExperimentDBManager.deleteFile(fileId);
            return null;
        }

        return fileId;
    }

    public List<GaussExperimentFilesDto> getFiles(Integer userId) {
        GaussExperimentFilesCondition condition = new GaussExperimentFilesCondition();

        GaussExperimentFilesCondition.Criteria privateFiles = condition.createCriteria();
        privateFiles.andUseridEqualTo(userId);

        GaussExperimentFilesCondition.Criteria publicFiles = condition.createCriteria();
        publicFiles.andAccessNotEqualTo(0);

        condition.or(publicFiles);

        return gaussExperimentDBManager.fetchFiles(condition);
    }

    public List<List<Integer>> loadFile(int fileId) {
        List<List<Integer>> uniformDistributionNumbersArray = new ArrayList<>();

        String csvFile = ConfigProvider.getGaussFilesBaseFolderPath() + fileId + ".csv";
        BufferedReader br = null;
        String line = "";

        try {

            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {
                String[] numbers = line.split(",");

                List<Integer> uniformDistributionNumbers = new ArrayList<>();
                for (String number : numbers) {
                    uniformDistributionNumbers.add(Integer.parseInt(number));
                }

                uniformDistributionNumbersArray.add(uniformDistributionNumbers);
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        return uniformDistributionNumbersArray;
    }
}
